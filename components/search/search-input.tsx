"use client";

import { Search } from "lucide-react";
import { forwardRef, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  highlighted?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      onFocus,
      placeholder = "Search...",
      className,
      highlighted = false,
    },
    ref,
  ) => {
    return (
      <div data-slot="search-input" className="relative w-full">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          maxLength={200}
          placeholder={placeholder}
          aria-label="Search questions"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          className={cn(
            "w-full pl-9",
            highlighted && "border-primary",
            className,
          )}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
