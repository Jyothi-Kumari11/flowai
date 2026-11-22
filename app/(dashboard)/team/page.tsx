import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { db } from "@/lib/db";
import { Users, Mail, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function TeamPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Team Members"
        subheading="Collaborate and manage project team members and permissions."
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-semibold text-sm text-gray-700">
          Total Members ({users.length})
        </div>
        <div className="divide-y divide-gray-100">
          {users.map((u) => (
            <div key={u.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                  {u.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{u.name || "User"}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" /> {u.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  {u.role}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                  {u.plan} PLAN
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
