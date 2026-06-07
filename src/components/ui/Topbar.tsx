"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  user?: any;
}

export default function Topbar({ title, subtitle, user }: TopbarProps) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
      {/* Left: Title */}
      <div>
        <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search…"
            className="h-9 pl-8 pr-4 text-sm bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 w-48 transition-all focus:w-64"
          />
        </div>

        {/* Dark toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold ml-1 cursor-pointer hover:opacity-90 transition-opacity">
          {user?.given_name?.[0] || ""}{user?.family_name?.[0] || ""}
        </div>
      </div>
    </header>
  );
}
