"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/components/navigation/constants";
import { ThemeLogo } from "@/components/navigation/full-logo";
import { NavLink } from "@/components/navigation/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        className="flex flex-col gap-6 border-none bg-mobile-nav p-6"
      >
        {/* Visually hidden title and description for accessibility */}
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse site pages and manage your account
        </SheetDescription>

        {/* Logo */}
        <SheetClose asChild>
          <Link href="/" className="flex items-center">
            <ThemeLogo />
          </Link>
        </SheetClose>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 pt-9">
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.route} asChild>
              <NavLink
                imgURL={link.imgURL}
                route={link.route}
                label={link.label}
              />
            </SheetClose>
          ))}
        </nav>

        {/* Sign out - Only when signed in */}
        <SignedIn>
          <div className="mt-auto">
            <SheetClose asChild>
              <SignOutButton>
                <button
                  type="button"
                  className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                >
                  <LogOut className="size-5" />
                  <span>Sign out</span>
                </button>
              </SignOutButton>
            </SheetClose>
          </div>
        </SignedIn>

        {/* Auth Buttons - Only when signed out */}
        <SignedOut>
          <div className="mt-auto flex flex-col gap-3">
            <SheetClose asChild>
              <SignInButton>
                <Button variant="soft" size="lg" className="w-full">
                  <span className="bg-(image:--gradient-primary) bg-clip-text text-transparent">
                    Sign in
                  </span>
                </Button>
              </SignInButton>
            </SheetClose>
            <SheetClose asChild>
              <SignUpButton>
                <Button variant="muted" size="lg" className="w-full">
                  Sign up
                </Button>
              </SignUpButton>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
}
