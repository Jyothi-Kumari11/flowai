"use client";

import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  User,
  Loader2,
  Sparkles,
  Check,
  Trash2,
  Edit2,
  X,
} from "lucide-react";
import { cn, getPriorityColor, getStatusColor, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const COLUMNS = [
  { id: "BACKLOG", label: "Backlog" },
  { id: "TODO", label: "To Do" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "IN_REVIEW", label: "In Review" },
  { id: "DONE", label: "Done" },
];

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
  assignee: { name: string | null; image: string | null } | null;
  tags: Array<{ id: string; name: string; color: string }>;
  subtasks: Array<{ id: string; completed: boolean }>;
  _count: { comments: number };
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  members: Array<{ user: { id?: string; name: string | null; image: string | null } }>;
}

export function ProjectKanban({ project, currentUserId }: { project: Project; currentUserId: string }) {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(project.tasks);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [activeModalCol, setActiveModalCol] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const getColumnTasks = (status: string) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = (taskId: string) => setDraggingId(taskId);

  const handleDrop = async (status: string) => {
    if (!draggingId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggingId ? { ...t, status } : t))
    );
    const updatedId = draggingId;
    setDraggingId(null);

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: updatedId, status }),
    });
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !activeModalCol) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          priority: taskPriority,
          status: activeModalCol,
          projectId: project.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setTaskTitle("");
      setTaskDesc("");
      setActiveModalCol(null);
      toast({
        title: "Task Added!",
        description: `Added "${newTask.title}" to ${activeModalCol}`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not create task",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setSelectedTask(null);
    toast({
      title: "Task Deleted",
      description: "Removed task from board.",
    });
  };

  const handleAiAutoPopulate = async () => {
    setIsGeneratingAi(true);
    try {
      const defaultTasks = [
        { title: "Design Landing Page & Product Catalog UI", priority: "HIGH", status: "TODO" },
        { title: "Configure Stripe Payment Gateway & Webhooks", priority: "URGENT", status: "TODO" },
        { title: "Setup Database Schemas in Neon PostgreSQL", priority: "HIGH", status: "IN_PROGRESS" },
        { title: "Build Shopping Cart & Checkout Flow", priority: "MEDIUM", status: "BACKLOG" },
        { title: "Add User Authentication & Order History", priority: "HIGH", status: "DONE" },
      ];

      for (const t of defaultTasks) {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...t,
            projectId: project.id,
          }),
        });
        if (res.ok) {
          const created = await res.json();
          setTasks((prev) => [...prev, created]);
        }
      }

      toast({
        title: "✨ AI Tasks Populated!",
        description: "Generated 5 starter sprint tasks for this project.",
      });
    } catch {
      toast({ title: "Error", description: "Could not auto-generate tasks." });
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div>
      {/* Top action banner if project has no tasks */}
      {tasks.length === 0 && (
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-100 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Board is ready! Add your first task or use AI</h4>
              <p className="text-xs text-gray-500">Auto-generate standard tasks or create one manually in any column.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAiAutoPopulate}
              disabled={isGeneratingAi}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm text-xs"
            >
              {isGeneratingAi ? (
                <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Generate 5 Tasks</>
              )}
            </Button>
            <Button
              onClick={() => setActiveModalCol("TODO")}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Task
            </Button>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = getColumnTasks(col.id);
          return (
            <div
              key={col.id}
              className="bg-gray-50/70 border border-gray-200/70 rounded-xl p-3 flex flex-col min-h-[500px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                    {col.label}
                  </span>
                  <span className="text-[11px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                    {colTasks.length}
                  </span>
                </div>
                <Button
                  onClick={() => setActiveModalCol(col.id)}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white text-gray-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Task Cards Container */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div
                    onClick={() => setActiveModalCol(col.id)}
                    className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-purple-300 hover:bg-purple-50/20 transition-all group"
                  >
                    <Plus className="w-5 h-5 text-gray-300 group-hover:text-purple-600 mx-auto mb-1 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-purple-600 transition-colors font-medium">
                      Add a task
                    </span>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDragStart={() => handleDragStart(task.id)}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Task Modal */}
      {activeModalCol && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-100 max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Add Task to <span className="text-purple-600">{activeModalCol}</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Create an action item for your team in this sprint.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-xs font-semibold text-gray-700">
                  Task Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Integrate Stripe Checkout Webhook"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="mt-1"
                  required
                  autoFocus
                />
              </div>

              <div>
                <Label htmlFor="desc" className="text-xs font-semibold text-gray-700">
                  Description (Optional)
                </Label>
                <textarea
                  id="desc"
                  rows={2}
                  placeholder="What needs to be done..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-700 block mb-1">
                  Priority
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {["LOW", "MEDIUM", "HIGH", "URGENT"].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setTaskPriority(p)}
                      className={`text-xs font-medium py-1.5 rounded-md border transition-all ${
                        taskPriority === p
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModalCol(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !taskTitle.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving...</>
                  ) : (
                    "Create Task"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-100 max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between mb-4">
              <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-semibold", getPriorityColor(selectedTask.priority))}>
                {selectedTask.priority} PRIORITY
              </span>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {selectedTask.title}
            </h2>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {selectedTask.description || "No description provided for this task yet."}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 mb-6 text-xs text-gray-600">
              <div>
                <span className="text-gray-400 block mb-1">Status</span>
                <span className="font-semibold text-purple-700">{selectedTask.status}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Database Target</span>
                <span className="font-semibold text-gray-800">Neon PostgreSQL</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="text-xs"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete Task
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({
  task,
  onDragStart,
  onClick,
}: {
  task: Task;
  onDragStart: () => void;
  onClick: () => void;
}) {
  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200/80 p-3.5 shadow-sm hover:shadow-md cursor-pointer active:cursor-grabbing transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold", getPriorityColor(task.priority))}>
          {task.priority}
        </span>
        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 text-gray-400">
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </div>

      <h4 className="text-sm font-semibold text-gray-800 mb-1 leading-snug">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mb-2">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Subtasks</span>
            <span>{completedSubtasks}/{task.subtasks.length}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div
              className="bg-purple-500 h-1 rounded-full"
              style={{ width: `${(completedSubtasks / task.subtasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {task._count?.comments > 0 && (
            <span className="flex items-center gap-1 text-[11px]">
              <MessageSquare className="w-3 h-3" /> {task._count.comments}
            </span>
          )}
          {task.dueDate && (
            <span className={cn(
              "flex items-center gap-1 text-[11px]",
              new Date(task.dueDate) < new Date() ? "text-red-500 font-medium" : "text-gray-400"
            )}>
              <Calendar className="w-3 h-3" /> {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
          {task.assignee?.name?.charAt(0).toUpperCase() || "J"}
        </div>
      </div>
    </div>
  );
}
