import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn, TOP_BAR_HEIGHT } from "@/lib/utils";

export function DesktopTopBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 hidden items-center gap-4 border-b bg-sidebar sm:flex layout-padding-x",
        TOP_BAR_HEIGHT,
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
