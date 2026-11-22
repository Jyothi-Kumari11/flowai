"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Shield, Bell, User, Key } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [name, setName] = useState("FlowAI Developer");
  const [email, setEmail] = useState("developer@flowai.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your profile information has been updated.",
    });
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings ⚙️"
        subheading="Manage your personal account preferences, workspace, and security."
      />

      <div className="max-w-4xl space-y-6">
        {/* Profile Form */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" /> Profile Information
          </h3>
          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* API & Security Box */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-600" /> Database & AI Status
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Database Engine</span>
              <span className="font-semibold text-purple-700">Neon Serverless PostgreSQL (Active)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">AI Model</span>
              <span className="font-semibold text-indigo-700">Google Gemini 1.5 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
