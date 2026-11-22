"use client";

import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle, FolderKanban } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const completionRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: null,
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: null,
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: `${completionRate}% completion rate`,
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Clock,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: null,
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      trend: stats.overdueTasks > 0 ? "Needs attention" : "All on track!",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 font-medium">{card.title}</span>
            <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
          {card.trend && (
            <div className="text-xs text-gray-400">{card.trend}</div>
          )}
        </div>
      ))}
    </div>
  );
}
