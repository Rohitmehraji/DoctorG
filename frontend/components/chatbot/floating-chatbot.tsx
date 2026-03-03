"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, SendHorizonal, X } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
};

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    ts: Date.now()
  };
}

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", "Hello, I’m DOCTORG AI. Ask me about conversion, follow-ups, or CRM optimization.")
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  useEffect(() => {
    if (!open) {
      return;
    }
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMessage = createMessage("user", trimmed);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/assistant/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clinic_id: 1,
          prompt: trimmed,
          context: {}
        })
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const assistantReply = data.reply?.trim() || "I could not generate a response right now.";
      setMessages((prev) => [...prev, createMessage("assistant", assistantReply)]);
    } catch (_err) {
      setError("Unable to reach AI assistant. Please retry in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-1/2 z-50 translate-x-1/2 sm:bottom-6 sm:right-6 sm:translate-x-0">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-3 flex h-[min(80vh,620px)] w-[95vw] max-w-[380px] flex-col rounded-2xl border border-white/15 bg-slate-900/80 shadow-glow backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-medium">DOCTORG AI Assistant</p>
              <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-white/10" aria-label="Close assistant">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                    message.role === "assistant"
                      ? "bg-white/10 text-white"
                      : "ml-auto bg-cyan-400/90 text-slate-950"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading ? (
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/80">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              ) : null}
            </div>

            <footer className="border-t border-white/10 p-3">
              {error ? <p className="mb-2 text-xs text-rose-300">{error}</p> : null}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Type your question..."
                />
                <button
                  onClick={() => void sendMessage()}
                  className="rounded-lg bg-cyan-400/90 p-2 text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!canSend}
                  aria-label="Send message"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </div>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((state) => !state)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 shadow-glow backdrop-blur-xl"
        aria-label="Toggle AI chatbot"
      >
        <Bot className="h-6 w-6 text-cyan-200" />
      </button>
    </div>
  );
}
