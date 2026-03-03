import { cn } from "@/lib/utils";

export function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-white/15 bg-white/10 shadow-glow backdrop-blur-xl", className)}>{children}</div>;
}
