import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn, LAYOUT_HORIZONTAL_PADDING, TOP_BAR_HEIGHT } from "@/lib/utils";

export function DesktopTopBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 hidden items-center gap-4 border-b bg-background sm:flex",
        TOP_BAR_HEIGHT,
        LAYOUT_HORIZONTAL_PADDING,
      )}
    >
      <div className="flex flex-1 justify-center">
        <p className="text-muted-foreground">Global Search</p>
      </div>

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
