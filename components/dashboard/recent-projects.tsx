"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Users, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  status: string;
  members: Array<{ user: { name: string | null; image: string | null } }>;
  tasks: Array<{ status: string }>;
  _count: { tasks: number };
  updatedAt: Date;
}

export function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Recent Projects</h3>
        <Link href="/projects" className="text-sm text-purple-600 hover:underline">
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No projects yet.{" "}
            <Link href="/projects/new" className="text-purple-600 hover:underline">
              Create your first project →
            </Link>
          </p>
        ) : (
          projects.map((project) => {
            const done = project.tasks.filter((t) => t.status === "DONE").length;
            const total = project.tasks.length;
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 group-hover:text-purple-700 truncate">
                        {project.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-gray-400 flex-shrink-0">{progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {done}/{total}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {project.members.length}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
