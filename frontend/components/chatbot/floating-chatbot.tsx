"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, SendHorizonal, X } from "lucide-react";

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-[340px] rounded-2xl border border-white/15 bg-slate-900/80 p-4 shadow-glow backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-medium">DOCTORG AI Assistant</p>
              <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
            </div>
            <p className="mb-3 text-sm text-white/70">Ask for CRM insights, follow-up scripts, or optimization ideas.</p>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
              <input className="w-full bg-transparent text-sm outline-none" placeholder="Type your question..." />
              <button className="rounded-lg bg-cyan-400/90 p-2 text-slate-950"><SendHorizonal className="h-4 w-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 shadow-glow backdrop-blur-xl"
        aria-label="Toggle AI chatbot"
      >
        <Bot className="h-6 w-6 text-cyan-200" />
      </button>
    </div>
  );
}
