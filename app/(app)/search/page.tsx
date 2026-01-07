type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <div className="space-y-6">
      <h1 className="text-heading-lg">Search Results</h1>
      {q ? (
        <p className="text-muted-foreground">
          Showing results for: <strong className="text-foreground">{q}</strong>
        </p>
      ) : (
        <p className="text-muted-foreground">Enter a search query to begin.</p>
      )}

      {/* TODO: Implement search results */}
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Do Search on mock data (+TDD) → then Convex.
      </div>
    </div>
  );
}
