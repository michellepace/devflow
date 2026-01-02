import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type TagLinkProps = {
  name: string;
  questionCount?: number;
};

export function TagLink({ name, questionCount }: TagLinkProps) {
  return (
    <Link
      href={`/tags/${name}`}
      className="group flex items-center justify-between gap-2 rounded-md p-1 transition-transform duration-150 hover:-translate-y-0.5 hover:scale-[1.005]"
    >
      <Badge className="rounded-md border-transparent bg-(--tag-bg) px-4 py-2 uppercase text-(--tag-text)">
        {name}
      </Badge>
      {questionCount !== undefined && (
        <span className="text-xs text-muted-foreground">{questionCount}</span>
      )}
    </Link>
  );
}
