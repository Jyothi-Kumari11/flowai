import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  generateProjectSummary,
  generateTaskSuggestions,
  generateSmartPrioritization,
} from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action, projectId, data } = await req.json();

  // Track AI usage
  await db.aiUsage.create({
    data: { userId: session.user.id, tokens: 500, feature: action },
  });

  switch (action) {
    case "project_summary": {
      const project = await db.project.findUnique({
        where: { id: projectId },
        include: {
          tasks: { select: { title: true, status: true, priority: true } },
          members: true,
        },
      });

      if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

      const summary = await generateProjectSummary({
        name: project.name,
        tasks: project.tasks,
        memberCount: project.members.length,
      });

      // Save summary
      await db.aiSummary.create({
        data: { projectId, content: JSON.stringify(summary), type: "project_summary" },
      });

      return NextResponse.json({ summary });
    }

    case "task_suggestions": {
      const project = await db.project.findUnique({
        where: { id: projectId },
        include: { tasks: { select: { title: true } } },
      });

      if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

      const suggestions = await generateTaskSuggestions({
        projectName: project.name,
        existingTasks: project.tasks.map((t) => t.title),
        goal: data?.goal,
      });

      return NextResponse.json({ suggestions });
    }

    case "smart_prioritization": {
      const tasks = await db.task.findMany({
        where: { projectId },
        select: { id: true, title: true, dueDate: true, priority: true },
      });

      const prioritization = await generateSmartPrioritization(
        tasks.map((t) => ({
          id: t.id,
          title: t.title,
          dueDate: t.dueDate?.toISOString(),
          priority: t.priority,
        }))
      );

      return NextResponse.json({ prioritization });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
