"use client";

import { Bell, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { day: "Mon", value: 1800 },
  { day: "Tue", value: 2200 },
  { day: "Wed", value: 2500 },
  { day: "Thu", value: 2100 },
  { day: "Fri", value: 3200 }
];

const pipelineData = [
  { stage: "New", leads: 24 },
  { stage: "Contacted", leads: 16 },
  { stage: "Qualified", leads: 11 },
  { stage: "Booked", leads: 7 },
  { stage: "Closed", leads: 4 }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">DOCTORG Command Center</h1>
            <p className="text-sm text-white/70">AI-driven conversion automation for growth clinics</p>
          </div>
          <button className="rounded-full border border-white/20 bg-white/10 p-3 shadow-glow backdrop-blur-xl">
            <Bell className="h-5 w-5" />
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Leads This Week", "84"],
            ["Conversion Rate", "31.4%"],
            ["Booked Revenue", "$42.3k"],
            ["Follow-up SLA", "9m"]
          ].map(([label, value], i) => (
            <motion.article
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-glow backdrop-blur-xl"
            >
              <p className="text-sm text-white/70">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-glow backdrop-blur-xl lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-medium">Revenue Momentum</h2>
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-glow backdrop-blur-xl">
            <h2 className="mb-4 font-medium">Pipeline</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <XAxis dataKey="stage" stroke="rgba(255,255,255,0.6)" />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-glow backdrop-blur-xl lg:col-span-2">
            <h2 className="mb-2 font-medium">Smart Suggestions</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Escalate 5 high-intent implant leads to senior closer immediately.</li>
              <li>• Trigger WhatsApp day-2 reminder for 13 no-response prospects.</li>
              <li>• Shift ad spend +12% to campaign segment with 2.1x better CPL.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-5 shadow-glow backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-cyan-300" />
              <h2 className="font-medium">AI Copilot Live</h2>
            </div>
            <p className="mt-3 text-sm text-white/80">Your follow-up agent reduced median response time by 18% this week.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
