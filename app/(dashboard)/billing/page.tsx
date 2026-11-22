"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PLANS } from "@/lib/stripe";
import { CheckCircle2, Zap, Shield, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BillingPage() {
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planKey: string) => {
    if (planKey === "FREE") return;

    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to start checkout");
      }
    } catch (err: any) {
      toast({
        title: "Checkout Notice",
        description:
          "Stripe keys are in test mode. To accept real credit cards, add your STRIPE_SECRET_KEY in .env!",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Subscription & Billing 💳"
        subheading="Manage your team's subscription, invoices, and billing details."
      />

      {/* Current Plan Overview Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple-200 text-sm font-medium">Current Active Plan</span>
            <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 text-xs">
              FREE TIER
            </Badge>
          </div>
          <h2 className="text-2xl font-bold">Standard Workspace</h2>
          <p className="text-purple-100 text-sm mt-1">
            You are currently on the Free plan. Upgrade to Pro for unlimited AI suggestions and projects.
          </p>
        </div>
        <Button
          onClick={() => handleSubscribe("PRO")}
          disabled={loadingPlan === "PRO"}
          className="bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-md"
        >
          {loadingPlan === "PRO" ? (
            <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Processing...</>
          ) : (
            "Upgrade to Pro"
          )}
        </Button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(PLANS).map(([key, plan]) => {
          const isPro = key === "PRO";
          return (
            <div
              key={key}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                isPro
                  ? "border-purple-500 shadow-lg relative ring-2 ring-purple-500/20"
                  : "border-gray-100 shadow-sm"
              }`}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                  {key === "FREE" && (
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1.5">/ month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleSubscribe(key)}
                disabled={loadingPlan === key || key === "FREE"}
                className={`w-full h-11 ${
                  isPro
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md"
                    : key === "FREE"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "border border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
                variant={key === "FREE" ? "secondary" : "default"}
              >
                {loadingPlan === key ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Starting Checkout...</>
                ) : key === "FREE" ? (
                  "Current Plan"
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
