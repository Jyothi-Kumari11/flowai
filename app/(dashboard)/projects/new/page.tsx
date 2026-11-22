"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FolderPlus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#f97316", // Orange
  "#eab308", // Yellow
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
];

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, color }),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      const project = await res.json();
      toast({
        title: "Project Created! 🚀",
        description: `Project "${project.name}" has been initialized.`,
      });

      router.push(`/projects/${project.id}`);
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Could not create the project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <div className="mb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
        </Link>
      </div>

      <DashboardHeader
        heading="Create New Project"
        subheading="Set up a workspace, pick a theme color, and invite team members."
      />

      <div className="max-w-2xl bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <Label htmlFor="projectName" className="text-sm font-semibold text-gray-700">
              Project Name *
            </Label>
            <Input
              id="projectName"
              placeholder="e.g., Q4 Mobile App Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-11"
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <Label htmlFor="projectDescription" className="text-sm font-semibold text-gray-700">
              Description (Optional)
            </Label>
            <textarea
              id="projectDescription"
              rows={3}
              placeholder="Brief summary of what this project aims to accomplish..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Color Picker */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 block mb-2">
              Workspace Accent Color
            </Label>
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-transform flex items-center justify-center ${
                    color === c ? "scale-125 ring-2 ring-offset-2 ring-purple-600" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && (
                    <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Box */}
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: color }}
            >
              {name ? name.charAt(0).toUpperCase() : "P"}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {name || "Untitled Project"}
              </div>
              <div className="text-xs text-gray-400">
                {description || "No description yet"}
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 h-11 px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
            <Link href="/projects">
              <Button type="button" variant="ghost" className="h-11">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
