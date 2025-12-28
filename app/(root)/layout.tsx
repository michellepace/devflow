import { cookies } from "next/headers";
import { DesktopTopBar } from "@/components/navigation/desktop-top-bar";
import { LeftSidebar } from "@/components/navigation/left-sidebar";
import { MobileTopBar } from "@/components/navigation/mobile-top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  cn,
  LAYOUT_HORIZONTAL_PADDING,
  MOBILE_TOP_BAR_OFFSET,
} from "@/lib/utils";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* Mobile-only top bar */}
      <MobileTopBar />

      {/* Full-height sidebar */}
      <LeftSidebar />

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Desktop-only top bar */}
        <DesktopTopBar />
        <main
          className={cn(
            "flex-1 pb-10 sm:pt-10",
            MOBILE_TOP_BAR_OFFSET,
            LAYOUT_HORIZONTAL_PADDING,
          )}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
