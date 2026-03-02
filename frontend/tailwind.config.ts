import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,.08), 0 8px 30px rgba(0, 0, 0, .25)"
      }
    }
  },
  plugins: []
};

export default config;
