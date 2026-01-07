"use client";

import { SearchHints } from "@/components/search/search-hints";
import { SearchInput } from "@/components/search/search-input";
import { SearchPopoverContent } from "@/components/search/search-popover-content";
import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { useSearch } from "@/hooks/use-search";

export function DesktopSearch() {
  const {
    isOpen,
    query,
    setQuery,
    inputRef,
    open,
    close,
    handleSubmit,
    handleKeyDown,
  } = useSearch();

  return (
    <Popover open={isOpen} onOpenChange={(open) => !open && close()}>
      <PopoverAnchor asChild>
        <form data-slot="searchbox" onSubmit={handleSubmit} className="w-full">
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={open}
            onKeyDown={handleKeyDown}
            highlighted={isOpen}
          />
        </form>
      </PopoverAnchor>
      <SearchPopoverContent>
        <SearchHints variant="desktop" onClose={close} />
      </SearchPopoverContent>
    </Popover>
  );
}
