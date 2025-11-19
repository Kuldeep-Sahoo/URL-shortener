"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  // Default = dark, override only if localStorage has a value
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true; // default dark
    }
    return true;
  });

  // Apply theme on first render + whenever dark changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 px-2 rounded-lg bg-slate-700 text-white dark:bg-cyan-600
      cursor-pointer
      "
    >
      {dark ? <Moon /> : <Sun />}
    </button>
  );
}
