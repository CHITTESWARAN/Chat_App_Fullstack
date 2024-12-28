import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee", // Initial theme from localStorage or default
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Save the theme to localStorage
    set({ theme }); // Update the Zustand store
  },
}));
