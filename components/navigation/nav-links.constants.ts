import type { Route } from "next";

export type NavLink = {
  iconUrl: string;
  route: Route;
  label: string;
};

export const NAV_LINKS = [
  { iconUrl: "/icons/home.svg", route: "/", label: "Home" },
  { iconUrl: "/icons/users.svg", route: "/community", label: "Community" },
  { iconUrl: "/icons/star.svg", route: "/collections", label: "Collections" },
  { iconUrl: "/icons/suitcase.svg", route: "/jobs", label: "Find Jobs" },
  { iconUrl: "/icons/tag.svg", route: "/tags", label: "Tags" },
  {
    iconUrl: "/icons/question.svg",
    route: "/questions/ask",
    label: "Ask Question",
  },
] as const satisfies readonly NavLink[];
