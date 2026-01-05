import { ChevronRight } from "lucide-react";
import Link from "next/link";

type QuestionLinkProps = {
  id: string;
  title: string;
};

export function QuestionLink({ id, title }: QuestionLinkProps) {
  return (
    <Link
      href={`/questions/${id}`}
      className="group -mx-2 flex items-center gap-2 rounded-md p-2"
    >
      <span className="flex-1 text-sm leading-snug text-foreground decoration-muted-foreground/50 underline-offset-2 group-hover:underline">
        {title}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}
