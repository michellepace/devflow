"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LeftSidebarToggle } from "@/components/navigation/left-sidebar-toggle";
import { NAV_LINKS } from "@/components/navigation/nav-links.constants";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { ThemedFullLogo } from "@/components/navigation/themed-full-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  cn,
  getNavIconInvertClasses,
  isRouteActive,
  NAV_LINK_ACTIVE_CLASSES,
  NAV_LINK_INACTIVE_CLASSES,
} from "@/lib/utils";

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      id="left-sidebar"
      collapsible="icon"
      width="13rem"
      className="shadow-light"
    >
      <SidebarHeader className="h-(--top-bar-height) flex-row items-center px-3">
        <Link
          href="/"
          aria-label="DevFlow sidebar logo"
          className="flex items-center group-data-[collapsible=icon]:size-6 group-data-[collapsible=icon]:justify-center"
        >
          {/* Icon-only when collapsed */}
          {/* biome-ignore lint/a11y/useAltText: Decorative logo, aria-label on parent link */}
          {/* biome-ignore lint/performance/noImgElement: SVG logo doesn't benefit from next/image optimisation */}
          <img
            src="/images/site-logo.svg"
            className="size-6 group-data-[collapsible=icon]:block hidden"
          />
          {/* Full logo when expanded */}
          <ThemedFullLogo className="group-data-[collapsible=icon]:hidden" />
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {NAV_LINKS.map((link) => {
                const isActive = isRouteActive(pathname, link.route);

                return (
                  <SidebarMenuItem key={link.route}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={link.label}
                      className={cn(
                        "rounded-lg",
                        isActive
                          ? `${NAV_LINK_ACTIVE_CLASSES} hover:bg-(image:--gradient-primary) hover:text-primary-foreground`
                          : NAV_LINK_INACTIVE_CLASSES,
                      )}
                    >
                      <Link href={link.route}>
                        <Image
                          src={link.iconUrl}
                          alt=""
                          width={20}
                          height={20}
                          className={getNavIconInvertClasses(isActive)}
                        />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: ThemeToggle + UserButton + Toggle */}
      <SidebarFooter className="flex flex-col items-start gap-3 p-2 pb-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0">
        <ThemeToggle size="lg" />
        <div
          className={cn(
            "flex w-full items-center gap-3",
            // Expanded: horizontal row with space between
            "justify-between",
            // Collapsed (icon mode): vertical stack, centered
            "group-data-[collapsible=icon]:w-auto",
            "group-data-[collapsible=icon]:flex-col",
            "group-data-[collapsible=icon]:justify-start",
          )}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
          <LeftSidebarToggle />
        </div>
      </SidebarFooter>

      {/* Edge-click rail to toggle */}
      <SidebarRail />
    </Sidebar>
  );
}
