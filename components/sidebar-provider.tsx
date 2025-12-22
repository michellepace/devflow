"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SidebarContextType = {
  isCollapsed: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const STORAGE_KEY = "devflow-sidebar-collapsed";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Default to expanded (false) - same as server render
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync with localStorage after mount (client-only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const toggle = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(next));
      }
      return next;
    });
  };

  // Always render children - SSR renders with default state (expanded)
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
