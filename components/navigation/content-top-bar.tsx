import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";
import { CONTENT_HORIZONTAL_PADDING, cn, HEADER_HEIGHT } from "@/lib/utils";

export function ContentTopBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 hidden items-center gap-4 border-b bg-background sm:flex",
        HEADER_HEIGHT,
        CONTENT_HORIZONTAL_PADDING,
      )}
    >
      {/* Left: Search - grows and centres */}
      <div className="flex flex-1 justify-center">
        <p className="text-muted-foreground">Global Search</p>
      </div>

      {/* Right: Theme + Auth - fixed width */}
      <div className="flex flex-none items-center gap-2">
        <ThemeToggle />
        <SignedOut>
          <SignInButton>
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}
