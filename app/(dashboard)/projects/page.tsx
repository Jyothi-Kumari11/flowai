import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { db } from "@/lib/db";
import Link from "next/link";
import { FolderKanban, Plus, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: {
      tasks: true,
      members: { include: { user: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        subheading="Manage and view all your active workspaces and kanban boards."
      >
        <Link href="/projects/new">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-gray-100 p-12 text-center">
            <FolderKanban className="w-12 h-12 text-purple-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">No projects found</h3>
            <p className="text-sm text-gray-500 mb-6">
              Create your first project to start tracking tasks and collaborating.
            </p>
            <Link href="/projects/new">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <Plus className="w-4 h-4 mr-2" /> Create Project
              </Button>
            </Link>
          </div>
        ) : (
          projects.map((project) => {
            const completed = project.tasks.filter((t) => t.status === "DONE").length;
            const total = project.tasks.length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>

                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1 truncate">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8">
                    {project.description || "No description provided."}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      {completed}/{total} tasks
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      {project.members.length} members
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </DashboardShell>
  );
}
