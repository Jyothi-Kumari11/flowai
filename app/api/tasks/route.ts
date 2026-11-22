import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELLED"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
  projectId: z.string(),
});

const updateTaskSchema = createTaskSchema.partial().extend({
  position: z.number().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const tasks = await db.task.findMany({
    where: projectId ? { projectId } : { assigneeId: session.user.id },
    include: { assignee: true, creator: true, tags: true, subtasks: true },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { projectId, dueDate, ...rest } = parsed.data;

  // Get the max position for the status column
  const maxPosition = await db.task.aggregate({
    where: { projectId, status: rest.status },
    _max: { position: true },
  });

  const task = await db.task.create({
    data: {
      ...rest,
      projectId,
      creatorId: session.user.id,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      position: (maxPosition._max.position ?? 0) + 1,
    },
    include: { assignee: true, creator: true, tags: true, subtasks: true },
  });

  return NextResponse.json(task, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...rest } = body;

  const parsed = updateTaskSchema.safeParse(rest);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const task = await db.task.update({
    where: { id },
    data: {
      ...parsed.data,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
    },
    include: { assignee: true, creator: true, tags: true, subtasks: true },
  });

  return NextResponse.json(task);
}
