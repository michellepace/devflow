import { LeftSidebar } from "@/components/navigation/left-sidebar";
import { Navbar } from "@/components/navigation/navbar";
import { SidebarProvider } from "@/components/sidebar-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <LeftSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
