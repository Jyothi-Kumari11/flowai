import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { TrendingUp, CheckCircle, Clock, Zap } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics & Velocity"
        subheading="Track team performance, completion velocity, and sprint metrics."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Sprint Velocity", value: "34 pts", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg Completion Time", value: "2.4 days", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Success Rate", value: "96.2%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{item.label}</span>
              <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      <ActivityChart />
    </DashboardShell>
  );
}
