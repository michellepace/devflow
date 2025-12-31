import { QuestionLink } from "@/components/right-sidebar/question-link";
import { TagLink } from "@/components/right-sidebar/tag-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { getTopQuestions } from "@/lib/data/questions";
import { getPopularTags } from "@/lib/data/tags";

/** Asymmetric padding: more on left, less on right (scrollbar side), reduced bottom */
const GROUP_PADDING = "pt-6 pb-2 pl-6 pr-3";

export async function RightSidebar() {
  const [topQuestions, popularTags] = await Promise.all([
    getTopQuestions(5),
    getPopularTags(5),
  ]);

  return (
    <aside
      aria-label="Top questions and popular tags"
      className="sticky top-(--top-bar-height) hidden h-[calc(100svh-var(--top-bar-height))] self-start xl:block"
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
              <div className="space-y-1">
                {topQuestions.map((question) => (
                  <QuestionLink
                    key={question._id}
                    id={question._id}
                    title={question.title}
                  />
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className={GROUP_PADDING}>
            <h2 className="text-heading-sm mb-4 text-foreground">
              Popular Tags
            </h2>
            <SidebarGroupContent>
              <div className="space-y-2">
                {popularTags.map((tag) => (
                  <TagLink
                    key={tag.name}
                    name={tag.name}
                    questionCount={tag.questions}
                  />
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
}
