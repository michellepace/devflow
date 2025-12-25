import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navigation/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 px-6 py-10 md:px-8 lg:px-12">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
