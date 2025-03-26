import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  return {
    theme: "light",
    setTheme: (theme) => {
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
      }
      set({ theme });
    },
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", newTheme === "dark");
          localStorage.setItem("theme", newTheme);
        }
        return { theme: newTheme };
      }),
  };
});
