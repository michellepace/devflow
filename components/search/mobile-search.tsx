"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchHints } from "@/components/search/search-hints";
import { SearchInput } from "@/components/search/search-input";
import { SearchPopoverContent } from "@/components/search/search-popover-content";
import { Button } from "@/components/ui/button";
import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

export function MobileSearch() {
  const [showHints, setShowHints] = useState(false);

  const {
    isOpen,
    query,
    setQuery,
    inputRef,
    open,
    reset,
    handleSubmit,
    handleKeyDown,
  } = useSearch({
    onClose: () => setShowHints(false),
  });

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, inputRef]);

  // 0.5s delay before showing hints
  useEffect(() => {
    if (!isOpen) {
      setShowHints(false);
      return;
    }

    const timer = setTimeout(() => setShowHints(true), 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {/* Search icon trigger button */}
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={open}
        className={cn(
          "text-foreground md:hidden",
          isOpen && "bg-accent text-accent-foreground",
        )}
        aria-label="Search"
      >
        <Search className="size-6" />
      </Button>

      {/* Overlay and search panel (only when active) */}
      {isOpen && (
        <>
          {/* Backdrop overlay - click to close */}
          <button
            type="button"
            tabIndex={-1}
            data-slot="mobile-search-overlay"
            className="animate-in fade-in-0 fixed inset-0 z-50 cursor-default bg-overlay/50 duration-300 md:hidden"
            onClick={reset}
            aria-label="Close search"
          />

          {/* Search input bar - separate card floating below topbar */}
          <div
            data-slot="mobile-search-input-bar"
            className="animate-in slide-in-from-top-2 fade-in-0 fixed left-0 right-0 top-(--top-bar-height) z-50 border-b bg-card px-4 py-3 shadow-sm duration-300 md:hidden"
          >
            <Popover open={showHints} onOpenChange={setShowHints}>
              <PopoverAnchor asChild>
                <form data-slot="mobile-search-form" onSubmit={handleSubmit}>
                  <SearchInput
                    ref={inputRef}
                    value={query}
                    onChange={setQuery}
                    onKeyDown={handleKeyDown}
                    highlighted={isOpen}
                  />
                </form>
              </PopoverAnchor>

              {/* Hints panel - separate floating card below input */}
              <SearchPopoverContent sideOffset={12}>
                <SearchHints variant="mobile" onClose={reset} />
              </SearchPopoverContent>
            </Popover>
          </div>
        </>
      )}
    </>
  );
}
