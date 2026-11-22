import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProjectKanban } from "@/components/projects/project-kanban";
import { ProjectHeader } from "@/components/projects/project-header";

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const project = await db.project.findUnique({
    where: { id: params.projectId },
    include: {
      members: { include: { user: true } },
      tasks: {
        include: {
          assignee: true,
          creator: true,
          tags: true,
          subtasks: true,
          _count: { select: { comments: true } },
        },
        orderBy: { position: "asc" },
      },
      tags: true,
    },
  });

  if (!project) notFound();

  const member = project.members.find((m) => m.userId === session.user!.id);
  if (!member) redirect("/dashboard");

  return (
    <DashboardShell>
      <ProjectHeader project={project} currentUserRole={member.role} />
      <ProjectKanban project={project} currentUserId={session.user.id} />
    </DashboardShell>
  );
}
