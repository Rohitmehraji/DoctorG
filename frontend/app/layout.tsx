import "./globals.css";
import type { Metadata } from "next";
import { FloatingChatbot } from "@/components/chatbot/floating-chatbot";

export const metadata: Metadata = {
  title: "DOCTORG",
  description: "AI Sales & Automation Agent for Clinics"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingChatbot />
      </body>
    </html>
  );
}
