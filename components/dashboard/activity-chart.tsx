"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", completed: 4, created: 6 },
  { name: "Tue", completed: 7, created: 9 },
  { name: "Wed", completed: 5, created: 7 },
  { name: "Thu", completed: 10, created: 8 },
  { name: "Fri", completed: 8, created: 12 },
  { name: "Sat", completed: 3, created: 2 },
  { name: "Sun", completed: 2, created: 1 },
];

export function ActivityChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Task Activity</h3>
          <p className="text-sm text-gray-500">Tasks created vs completed this week</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-gray-500">Created</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-500">Completed</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#d1d5db" />
          <YAxis tick={{ fontSize: 12 }} stroke="#d1d5db" />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
          />
          <Area type="monotone" dataKey="created" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorCreated)" />
          <Area type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} fill="url(#colorCompleted)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
