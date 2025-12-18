import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function JobsPage() {
  return (
    <>
      <div className="bg-primary/30">
        {`TOP OF PAGE: ${"words ".repeat(100)}`}
      </div>

      <Empty className="border-2 border-primary">
        <EmptyHeader className="border-2 border-primary">
          <EmptyTitle className="border-2 border-primary">Find Jobs</EmptyTitle>
          <EmptyDescription className="border-2 border-primary">
            {"words ".repeat(100)}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <div className="bg-primary/30">
        {`BOTTOM OF PAGE: ${"words ".repeat(100)}`}
      </div>
    </>
  );
}
