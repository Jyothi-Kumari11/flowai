import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { AiInsightsPanel } from "@/components/dashboard/ai-insights-panel";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch dashboard data
  const [projects, tasks] = await Promise.all([
    db.project.findMany({
      where: {
        members: { some: { userId: session.user.id } },
      },
      include: {
        members: { include: { user: true } },
        tasks: true,
        _count: { select: { tasks: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
    db.task.findMany({
      where: {
        OR: [
          { assigneeId: session.user.id },
          { creatorId: session.user.id },
        ],
      },
      include: { project: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "DONE"
  ).length;

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Good morning, ${session.user.name?.split(" ")[0] ?? "there"} 👋`}
        subheading="Here's what's happening with your projects today."
      />

      <StatsCards
        stats={{
          totalProjects: projects.length,
          totalTasks,
          completedTasks,
          inProgressTasks,
          overdueTasks,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityChart />
          <RecentProjects projects={projects} />
        </div>
        <div>
          <AiInsightsPanel userId={session.user.id} />
        </div>
      </div>
    </DashboardShell>
  );
}
