import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { db } from "@/lib/db";
import { getPriorityColor, getStatusColor, formatDate } from "@/lib/utils";
import { CheckSquare, Calendar, Folder } from "lucide-react";

export default async function TasksPage() {
  const tasks = await db.task.findMany({
    include: {
      project: true,
      assignee: true,
      subtasks: true,
    },
    orderBy: { dueDate: "asc" },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Tasks"
        subheading="All tasks assigned across your active projects."
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {tasks.length === 0 ? (
          <div className="p-12 text-center">
            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">No tasks yet</h3>
            <p className="text-sm text-gray-500">
              When tasks are assigned to you or created in projects, they will show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Folder className="w-3 h-3" /> {task.project.name}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
