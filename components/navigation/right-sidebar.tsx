import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

/** Asymmetric padding: more on left, less on right (scrollbar side), reduced bottom */
const GROUP_PADDING = "pt-6 pb-2 pl-6 pr-3";

export function RightSidebar() {
  // Uses var() syntax — variable not registered in @theme
  return (
    <aside
      aria-label="Top questions and popular tags"
      className="sticky top-[var(--top-bar-height)] hidden h-[calc(100svh-var(--top-bar-height))] self-start xl:block"
    >
      <Sidebar
        id="right-sidebar"
        side="right"
        collapsible="none"
        width="22rem"
        className="border-l shadow-light"
      >
        <SidebarContent className="mr-4 pb-6">
          <SidebarGroup className={GROUP_PADDING}>
            <h2 className="text-heading-sm mb-4 text-foreground">
              Top Questions
            </h2>
            <SidebarGroupContent>
              <div className="space-y-6">
                {Array.from({ length: 6 }, (_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className={GROUP_PADDING}>
            <h2 className="text-heading-sm mb-4 text-foreground">
              Popular Tags
            </h2>
            <SidebarGroupContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
}
