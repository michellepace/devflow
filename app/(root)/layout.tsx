import { cookies } from "next/headers";
import { DesktopTopBar } from "@/components/navigation/desktop-top-bar";
import { LeftSidebar } from "@/components/navigation/left-sidebar";
import { MobileTopBar } from "@/components/navigation/mobile-top-bar";
import { RightSidebar } from "@/components/navigation/right-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const sidebarOpenFromCookie =
    cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={sidebarOpenFromCookie}>
      <LeftSidebar />

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        <MobileTopBar />
        <DesktopTopBar />

        {/* Content + Right Sidebar row */}
        <div className="flex flex-1">
          <main className="flex-1 pb-10 pt-10 layout-padding-x">
            {children}
          </main>
          <RightSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
