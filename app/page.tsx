"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  Users,
  Zap,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Insights",
    description:
      "Get intelligent task suggestions, smart prioritization, and project health analysis powered by Gemini AI.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: LayoutDashboard,
    title: "Visual Kanban Boards",
    description:
      "Drag-and-drop task management with customizable workflows. See your project at a glance.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly. Live updates, comments, and notifications keep your team in sync.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description:
      "Track velocity, burndown charts, and team performance with beautiful visual dashboards.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description:
      "Automate repetitive workflows. AI suggests when to escalate priorities and assigns tasks intelligently.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Role-based access control, SSO, and audit logs keep your project data safe and compliant.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

const stats = [
  { label: "Active Teams", value: "10,000+" },
  { label: "Tasks Completed", value: "2M+" },
  { label: "AI Suggestions Made", value: "500K+" },
  { label: "Uptime", value: "99.9%" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    avatar: "SC",
    text: "FlowAI completely transformed how our team manages projects. The AI suggestions are surprisingly accurate!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "MJ",
    text: "We reduced our sprint planning time by 60%. The AI prioritization feature is a game changer.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Engineering Lead",
    avatar: "PS",
    text: "Best project management tool I've used. Clean UI, powerful AI, and great team collaboration.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                FlowAI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Testimonials</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50">
              🚀 Powered by Gemini AI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Manage Projects{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Smarter
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10">
              FlowAI combines powerful project management with cutting-edge AI to help your team
              move faster, prioritize better, and ship more. From startup to enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 h-12 px-8 text-base">
                  Start for Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">No credit card required · Free forever plan</p>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-purple-100 p-4 shadow-2xl shadow-purple-100">
              <div className="bg-white rounded-xl border border-gray-100 p-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-4 text-sm text-gray-400">FlowAI Dashboard</span>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Tasks", value: "48", change: "+12%", color: "bg-purple-500" },
                    { label: "Completed", value: "31", change: "+8%", color: "bg-green-500" },
                    { label: "In Progress", value: "12", change: "-3%", color: "bg-blue-500" },
                    { label: "Overdue", value: "5", change: "-15%", color: "bg-red-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                      <div className={`w-8 h-1 ${stat.color} rounded mb-2`} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                      <div className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["TODO", "IN PROGRESS", "IN REVIEW", "DONE"].map((col) => (
                    <div key={col} className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="text-xs font-semibold text-gray-500 mb-2">{col}</div>
                      {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded border border-gray-100 p-2 mb-2 text-xs text-gray-700">
                          Task item {i}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything your team needs
            </h2>
            <p className="text-xl text-gray-500">
              Powerful features powered by AI to help you ship faster
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-500">Start free, upgrade when you need more</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["3 Projects", "10 Tasks/project", "2 Team members", "5 AI suggestions/mo"],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$12",
                period: "per month",
                features: ["Unlimited Projects", "Unlimited Tasks", "25 Team members", "200 AI suggestions/mo", "Advanced analytics"],
                cta: "Start Pro Trial",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$49",
                period: "per month",
                features: ["Everything in Pro", "Unlimited members", "Unlimited AI usage", "SSO & SAML", "Dedicated support"],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-100"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlighted ? "text-purple-200" : "text-gray-500"}`}>
                    /{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${plan.highlighted ? "text-purple-200" : "text-green-500"}`} />
                      <span className={plan.highlighted ? "text-purple-100" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-white text-purple-600 hover:bg-purple-50"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by teams worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to supercharge your team?
          </h2>
          <p className="text-xl text-purple-200 mb-10">
            Join 10,000+ teams who use FlowAI to ship faster and smarter.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 h-12 px-10 text-base font-semibold">
              Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FlowAI</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 FlowAI. Built with Next.js, Prisma, and Gemini AI.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/docs" className="hover:text-white">Docs</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
