import { LeftSidebar } from "@/components/navigation/left-sidebar";
import { Navbar } from "@/components/navigation/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
