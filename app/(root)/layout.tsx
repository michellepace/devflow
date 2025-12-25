import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import { ContentTopBar } from "@/components/navigation/content-top-bar";
import { MobileHeader } from "@/components/navigation/mobile-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  CONTENT_HORIZONTAL_PADDING,
  cn,
  MOBILE_HEADER_TOP_OFFSET,
} from "@/lib/utils";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* Mobile-only fixed header */}
      <MobileHeader />

      {/* Full-height sidebar */}
      <AppSidebar />

      {/* Content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Desktop-only top bar */}
        <ContentTopBar />
        <main
          className={cn(
            "flex-1 pb-10 sm:pt-10",
            MOBILE_HEADER_TOP_OFFSET,
            CONTENT_HORIZONTAL_PADDING,
          )}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
