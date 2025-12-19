const Home = () => (
  <>
    <h1>Hello Root page with heading H1</h1>

    {/* Header boundary marker */}
    <div className="mt-8 bg-primary/30 p-4">HEADER: {"words ".repeat(50)}</div>

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

    {/* Footer boundary marker */}
    <div className="bg-primary/30 p-4">FOOTER: {"words ".repeat(50)}</div>
  </>
);

export default Home;
