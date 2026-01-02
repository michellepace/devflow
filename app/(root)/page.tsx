import { TagLink } from "@/components/tag-link";

const HomePage = () => (
  <>
    <h1 className="text-heading-2xl">All Questions</h1>

    <div className="mt-8 space-y-6">
      {[1, 2, 3, 4].map((questionIndex) => (
        <article
          key={`question-${questionIndex}`}
          className="rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Question #{questionIndex}
            </span>
            <span className="text-xs text-muted-foreground">
              Asked {questionIndex} hours ago
            </span>
          </div>

          <h2 className="text-heading-sm mb-2">
            How to implement a sticky sidebar in Next.js with Tailwind CSS?
          </h2>

          <p className="mb-4 text-muted-foreground">
            I&apos;m building a dashboard layout and need the sidebar to remain
            visible while scrolling the main content. The sidebar should stick
            below the navbar and scroll independently if its content overflows.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {["tailwind", "nextjs"].map((tag) => (
              <TagLink key={tag} name={tag} />
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {questionIndex * 7}
              </span>{" "}
              votes
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {questionIndex * 3}
              </span>{" "}
              answers
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">
                {questionIndex * 47}
              </span>{" "}
              views
            </span>
          </div>
        </article>
      ))}

      {/* End marker */}
      <div className="rounded-lg bg-muted p-6 text-center text-muted-foreground">
        You&apos;ve reached the end — sidebar should still be sticky!
      </div>
    </div>
  </>
);

export default HomePage;
