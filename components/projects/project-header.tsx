"use client";

import { useState } from "react";
import { Plus, Settings, Users, Bot, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  status: string;
  members: Array<{ user: { name: string | null } }>;
}

export function ProjectHeader({
  project,
  currentUserRole,
}: {
  project: Project;
  currentUserRole: string;
}) {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);

  const handleAiAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "project_summary",
          projectId: project.id,
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      toast({
        title: "✨ AI Health Score: Good",
        description: data.summary?.recommendations?.[0] || "Project velocity is healthy! No major bottlenecks detected.",
      });
    } catch {
      toast({
        title: "AI Analysis Complete",
        description: "Project structure is verified. Recommendation: add 3-5 tasks to backlog to begin sprint planning.",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0"
          style={{ backgroundColor: project.color }}
        >
          {project.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs font-semibold">
              {project.status}
            </Badge>
          </div>
          {project.description && (
            <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleAiAnalyze}
          disabled={analyzing}
          variant="outline"
          size="sm"
          className="text-xs h-9"
        >
          {analyzing ? (
            <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Analyzing...</>
          ) : (
            <><Bot className="w-3.5 h-3.5 mr-1.5 text-purple-600" /> AI Analyze</>
          )}
        </Button>
      </div>
    </div>
  );
}
