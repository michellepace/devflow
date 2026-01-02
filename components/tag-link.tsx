import { Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getDeviconClassName } from "@/lib/devicon";

type TagLinkProps = {
  name: string;
  questionCount?: number;
  colored?: boolean;
  showIcon?: boolean;
};

export function TagLink({
  name,
  questionCount,
  colored = false,
  showIcon = false,
}: TagLinkProps) {
  const iconClass = getDeviconClassName(name, colored);

  return (
    <Link
      href={`/tags/${name}`}
      className="group flex items-center justify-between gap-2 rounded-md p-1 transition-transform duration-150 hover:-translate-y-0.5 hover:scale-[1.005]"
    >
      <Badge className="flex items-center gap-1.5 rounded-md border-transparent bg-(--tag-bg) px-4 py-1.5 uppercase text-(--tag-text)">
        {showIcon &&
          (iconClass ? (
            <i className={iconClass} aria-hidden="true" />
          ) : (
            <Tag className="size-3.5" aria-hidden="true" />
          ))}
        {name}
      </Badge>
      {questionCount !== undefined && (
        <span className="text-xs text-muted-foreground">{questionCount}</span>
      )}
    </Link>
  );
}
