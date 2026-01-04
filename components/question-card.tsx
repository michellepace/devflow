"use client";

import Link from "next/link";
import { TagLink } from "@/components/tag-link";
import type { Question } from "@/lib/data/questions";
import { getRelativeTime } from "@/lib/utils";

type QuestionCardProps = {
  question: Question;
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {question.author.name}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">
          Asked {getRelativeTime(question.createdAt)}
        </span>
      </div>

      <Link href={`/question/${question._id}`} className="group">
        <h2 className="text-heading-sm mb-2 group-hover:text-primary">
          {question.title}
        </h2>
      </Link>

      <p className="mb-4 line-clamp-2 text-muted-foreground">{question.body}</p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <TagLink key={tag} name={tag} />
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="font-semibold text-foreground">
            {question.votes}
          </span>{" "}
          votes
        </span>
        <span className="flex items-center gap-1">
          <span className="font-semibold text-foreground">
            {question.answerCount}
          </span>{" "}
          answers
        </span>
        <span className="flex items-center gap-1">
          <span className="font-semibold text-foreground">
            {question.viewCount}
          </span>{" "}
          views
        </span>
      </div>
    </article>
  );
}
