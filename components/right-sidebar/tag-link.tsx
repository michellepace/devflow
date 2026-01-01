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
      className="flex items-center justify-between gap-2 rounded-md p-1 transition-colors hover:bg-accent/50"
    >
      <Badge variant="toptag">{name}</Badge>
      {questionCount !== undefined && (
        <span className="text-sm text-foreground">{questionCount}</span>
      )}
    </Link>
  );
}
