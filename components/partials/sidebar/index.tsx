"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import ClassicSidebar from "./classic";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (isDesktop) {
    return <ClassicSidebar />
  }
  return <MobileSidebar />
};

export default Sidebar;