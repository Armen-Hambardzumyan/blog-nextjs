"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
  }, [setTheme]);

  return <>{children}</>;
}
