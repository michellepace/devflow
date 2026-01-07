"use client";

import type * as React from "react";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type SearchPopoverContentProps = React.ComponentProps<typeof PopoverContent>;

export function SearchPopoverContent({
  className,
  sideOffset = 8,
  ...props
}: SearchPopoverContentProps) {
  return (
    <PopoverContent
      className={cn(
        "w-(--radix-popover-trigger-width) border-border bg-popover p-0 shadow-lg shadow-foreground/20 dark:shadow-foreground/5",
        className,
      )}
      align="start"
      sideOffset={sideOffset}
      onOpenAutoFocus={(e) => e.preventDefault()}
      {...props}
    />
  );
}
