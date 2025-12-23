import type { Route } from "next";

export type NavLink = {
  imgURL: string;
  route: Route;
  label: string;
};

export const NAV_LINKS = [
  { imgURL: "/icons/home.svg", route: "/", label: "Home" },
  { imgURL: "/icons/users.svg", route: "/community", label: "Community" },
  { imgURL: "/icons/star.svg", route: "/collections", label: "Collections" },
  { imgURL: "/icons/suitcase.svg", route: "/jobs", label: "Find Jobs" },
  { imgURL: "/icons/tag.svg", route: "/tags", label: "Tags" },
  {
    imgURL: "/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
] as const satisfies readonly NavLink[];
