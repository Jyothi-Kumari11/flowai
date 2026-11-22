import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Bell, Check, Clock, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      title: "Task Assigned",
      message: "You have been assigned to 'Implement Database Connection'.",
      time: "10 minutes ago",
      read: false,
      icon: Info,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: "2",
      title: "AI Analysis Ready",
      message: "Project sprint summary for 'FlowAI Platform' is now available.",
      time: "1 hour ago",
      read: false,
      icon: Check,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      id: "3",
      title: "Sprint Deadline Approaching",
      message: "Sprint #1 has 2 days remaining with 3 open tasks.",
      time: "Yesterday",
      read: true,
      icon: AlertTriangle,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications 🔔"
        subheading="Stay up to date with task assignments, mentions, and AI alerts."
      >
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </DashboardHeader>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start gap-4 transition-colors hover:bg-gray-50 ${
                !item.read ? "bg-purple-50/20" : ""
              }`}
            >
              <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
