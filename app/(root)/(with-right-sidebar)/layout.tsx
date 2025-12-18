// TODO: Add <RightSidebar> for tag widgets, hot questions, etc.
// Layout: [LeftSidebar (sticky)] [Main Content] [RightSidebar]
const WithRightSidebarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <main className="flex-1 px-6 py-10 md:px-8 lg:px-12">{children}</main>;
};

export default WithRightSidebarLayout;
