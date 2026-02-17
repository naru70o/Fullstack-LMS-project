"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 hover:bg-popover-foreground/7 rounded-md transition-colors"
        aria-label="Toggle theme"
      >
        <Sun size={20} className="text-[var(--primary-color)]" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 hover:bg-popover-foreground/7 rounded-md transition-colors"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun size={20} className="text-[var(--primary-color)]" />
      ) : (
        <Moon size={20} className="text-[var(--primary-color)]" />
      )}
    </button>
  );
}
