const HomePage = () => (
  <>
    <h1>Hello Root page with heading H1</h1>

    {/* Demo: top overflow test */}
    <div className="mt-8 bg-primary/30 p-4">{"words ".repeat(50)}</div>

    {/* Flexbox demo: grow vs flex-none */}
    <div className="my-8 flex gap-4 border-2 border-dashed border-primary p-4">
      {/* Fixed width - won't grow */}
      <div className="flex h-24 w-24 flex-none items-center justify-center rounded-lg border-2 border-dashed border-primary bg-sky-500/20 text-sm font-medium">
        flex-none
      </div>

      {/* Grows to fill available space */}
      <div className="flex h-24 grow items-center justify-center rounded-lg border-2 border-dashed border-primary bg-indigo-500/30 text-sm font-medium">
        grow
      </div>

      {/* Fixed width - won't grow */}
      <div className="flex h-24 w-24 flex-none items-center justify-center rounded-lg border-2 border-dashed border-primary bg-sky-500/20 text-sm font-medium">
        flex-none
      </div>
    </div>

    {/* Demo: bottom overflow test */}
    <div className="bg-primary/30 p-4">{"words ".repeat(50)}</div>

    {/* Question boxes for testing sticky sidebar scroll */}
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

          <h2 className="mb-2 text-xl font-semibold">
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
            {["next.js", "tailwindcss", "react", "css"].map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
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
