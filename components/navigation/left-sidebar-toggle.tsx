"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function LeftSidebarToggle() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggleSidebar}
      className={cn(
        "shrink-0 rounded-full text-sidebar-foreground",
        !isCollapsed && "bg-muted",
      )}
      aria-label={isCollapsed ? "Expand left sidebar" : "Collapse left sidebar"}
      aria-expanded={!isCollapsed}
      aria-controls="left-sidebar"
    >
      {isCollapsed ? (
        <ChevronsRight className="size-5" />
      ) : (
        <ChevronsLeft className="size-5" />
      )}
    </Button>
  );
}
