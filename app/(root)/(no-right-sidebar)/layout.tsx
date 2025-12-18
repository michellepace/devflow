// Full-width layout without right sidebar
// Layout: [LeftSidebar (sticky)] [Main Content]
const NoRightSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-1 px-6 py-10 md:px-8 lg:px-12">{children}</main>;
};

export default NoRightSidebarLayout;
