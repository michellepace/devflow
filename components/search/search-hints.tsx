import Link from "next/link";
import { SEARCH_HINTS } from "@/components/search/search-hints-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchHintsProps = {
  variant: "mobile" | "desktop";
  onClose?: () => void;
};

export function SearchHints({ variant, onClose }: SearchHintsProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      data-slot="search-hints"
      className="flex flex-col gap-4 bg-popover p-4"
    >
      <div
        data-slot="search-hints-grid"
        className={cn(
          "grid gap-x-6 gap-y-2",
          isMobile ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {SEARCH_HINTS.map((hint) => (
          <div key={hint.syntax} className="flex items-baseline gap-2">
            <span className="shrink-0 font-mono text-sm font-semibold">
              {hint.syntax}
            </span>
            <span className="text-sm text-muted-foreground">
              {hint.description}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <Button
          asChild
          size="sm"
          className="text-xs font-light transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Link href="/questions/ask" onClick={onClose}>
            Ask a question
          </Link>
        </Button>
      </div>
    </div>
  );
}
