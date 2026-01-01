"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MobileNavLink } from "@/components/navigation/mobile-navlink";
import { NAV_LINKS } from "@/components/navigation/nav-links.constants";
import { ThemedFullLogo } from "@/components/navigation/themed-full-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MOBILE_NAV_MAX_WIDTH = "max-w-[320px]";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* modal={false} allows Clerk popups to work (they render outside Sheet), but
          disables SheetOverlay dismiss. See authenticated.mobile.spec.ts */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          className="animate-in fade-in-0 fixed inset-0 z-40 cursor-default bg-overlay/50 duration-500 sm:hidden"
          onClick={() => setOpen(false)}
          data-slot="sheet-overlay"
          aria-label="Dismiss menu"
        />
      )}
      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            className="text-sidebar-foreground sm:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className={cn(
            "flex flex-col gap-6 bg-sidebar p-6 shadow-2xl",
            MOBILE_NAV_MAX_WIDTH,
          )}
        >
          <SheetHeader className="flex-row items-center p-0">
            <SheetTitle className="sr-only">Mobile navigation menu</SheetTitle>
            <SheetClose asChild>
              <Link href="/" className="flex items-center">
                <ThemedFullLogo className="h-7" />
              </Link>
            </SheetClose>
          </SheetHeader>

          <nav className="flex flex-1 flex-col gap-3 pt-5">
            {NAV_LINKS.map((link) => (
              <SheetClose key={link.route} asChild>
                <MobileNavLink
                  iconUrl={link.iconUrl}
                  route={link.route}
                  label={link.label}
                />
              </SheetClose>
            ))}
          </nav>

          <SheetFooter className="gap-3 p-0 pb-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "size-10" },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="soft"
                  size="lg"
                  className="w-full text-base"
                  onClick={() => setOpen(false)}
                >
                  <span className="bg-(image:--gradient-primary) bg-clip-text text-transparent">
                    Sign in
                  </span>
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="muted"
                  size="lg"
                  className="w-full text-base"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
