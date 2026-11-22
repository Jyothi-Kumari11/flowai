"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Bot, Send, Sparkles, Lightbulb, Zap, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am FlowAI Assistant powered by Google Gemini. How can I help you plan, prioritize, or break down your project tasks today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Here are some recommendations based on your request." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm currently working with local demo suggestions! When you connect your GEMINI_API_KEY in .env, I'll provide live custom reasoning for your projects.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Break down building user authentication into tasks",
    "How should I prioritize backend vs frontend first?",
    "Suggest sprint goals for MVP launch",
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Assistant 🤖"
        subheading="Ask for smart task breakdowns, priority estimations, and architecture advice."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat area */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 flex flex-col h-[650px] shadow-sm">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-50 border border-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700 flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 items-center text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setInput(p)}
                className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-purple-600" />
                {p}
              </button>
            ))}
          </div>

          {/* Input box */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-gray-100 flex gap-2 items-center"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your projects, tasks, or workflows..."
              className="h-11"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-11 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Side Panel: Capabilities */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" /> AI Capabilities
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Automatic sprint decomposition into user stories & tasks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Deadlock & bottleneck identification in kanban flows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Prioritization matrices (Urgent vs Important).</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-5">
            <h4 className="font-semibold text-purple-900 text-sm mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-purple-600" /> Pro Tip
            </h4>
            <p className="text-xs text-purple-700 leading-relaxed">
              Add your <code className="bg-white/80 px-1 py-0.5 rounded text-purple-900">GEMINI_API_KEY</code> in <code className="bg-white/80 px-1 py-0.5 rounded text-purple-900">.env</code> to unleash real-time streaming insights across all your team members!
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
