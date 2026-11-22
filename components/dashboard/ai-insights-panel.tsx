"use client";

import { useState } from "react";
import { Bot, Loader2, Lightbulb, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AiInsightsPanelProps {
  userId: string;
}

export function AiInsightsPanel({ userId }: AiInsightsPanelProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const generateInsights = async () => {
    setLoading(true);
    try {
      // In a real app, this would call /api/ai with specific project data
      await new Promise((r) => setTimeout(r, 2000));
      setInsights({
        health: "Good",
        completionPercentage: 68,
        bottlenecks: ["3 tasks blocked in review", "2 high-priority items overdue"],
        recommendations: [
          "Move 'API Integration' task from review — it's been there 5 days",
          "Assign overdue tasks to available team members",
          "Break down 'Database Migration' into smaller subtasks",
        ],
      });
    } catch {
      toast({ title: "Error", description: "Failed to generate AI insights.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">AI Insights</h3>
          <p className="text-xs text-gray-400">Powered by Gemini</p>
        </div>
      </div>

      {!insights ? (
        <div className="text-center py-8">
          <Sparkles className="w-10 h-10 text-purple-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-4">
            Get AI-powered insights about your projects, bottlenecks, and recommendations.
          </p>
          <Button
            onClick={generateInsights}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            size="sm"
          >
            {loading ? (
              <><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Analyzing...</>
            ) : (
              <><Sparkles className="w-3 h-3 mr-2" /> Generate Insights</>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Health */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Project Health</span>
            <span className="text-sm font-bold text-green-600">{insights.health}</span>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completion</span>
              <span className="font-medium text-gray-900">{insights.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                style={{ width: `${insights.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Bottlenecks */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Bottlenecks</span>
            </div>
            <ul className="space-y-1">
              {insights.bottlenecks.map((b: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-orange-400 mt-0.5">•</span> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recommendations</span>
            </div>
            <ul className="space-y-2">
              {insights.recommendations.map((r: string, i: number) => (
                <li key={i} className="text-xs text-gray-600 bg-purple-50 rounded-lg p-2">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={generateInsights}
            variant="outline"
            size="sm"
            className="w-full text-xs"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <TrendingUp className="w-3 h-3 mr-1" />}
            Refresh Insights
          </Button>
        </div>
      )}
    </div>
  );
}
