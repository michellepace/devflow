import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { GlobalSearch } from "@/components/search/global-search";
import { Button } from "@/components/ui/button";

export function DesktopTopBar() {
  return (
    <header className="sticky top-0 z-40 hidden h-(--top-bar-height) items-center bg-background sm:flex">
      {/* Left section: matches main content structure (padding + max-w-5xl centering) */}
      <div className="flex flex-1 items-center px-6 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <GlobalSearch />
        </div>
      </div>

      {/* Right section: matches right sidebar width on xl */}
      <div className="flex flex-none items-center justify-end gap-2 px-6 xl:w-(--right-sidebar-width)">
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
