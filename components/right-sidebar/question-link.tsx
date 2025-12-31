import { ChevronRight } from "lucide-react";
import Link from "next/link";

type QuestionLinkProps = {
  id: string;
  title: string;
};

export function QuestionLink({ id, title }: QuestionLinkProps) {
  return (
    <Link
      href={`/question/${id}`}
      className="-mx-2 flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-accent/50"
    >
      <span className="flex-1 text-sm leading-snug text-foreground">
        {title}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
