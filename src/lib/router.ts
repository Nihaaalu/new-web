import { useEffect, useState } from "react";
import { TabType } from "../types";

// Map pathnames to our TabType
export const pathToTab = (path: string): TabType => {
  const p = path.toLowerCase().replace(/\/$/, ""); // remove trailing slash
  if (p === "/gallery") return "gallery";
  if (p === "/about") return "about";
  if (p === "/contact") return "contact";
  return "home";
};

// Map TabType to pathnames
export const tabToPath = (tab: TabType): string => {
  if (tab === "gallery") return "/gallery";
  if (tab === "about") return "/about";
  if (tab === "contact") return "/contact";
  return "/";
};

// Core navigation utility for clean programmatic path manipulation
export const navigate = (path: string) => {
  window.history.pushState(null, "", path);
  // Dispatch custom popstate event so all routed systems react immediately
  window.dispatchEvent(new Event("popstate"));
  // Scroll dynamically to the top on every route transition
  window.scrollTo({ top: 0, behavior: "instant" });
};

export function useCurrentTab(): TabType {
  const [tab, setTab] = useState<TabType>(() => pathToTab(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setTab(pathToTab(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return tab;
}
