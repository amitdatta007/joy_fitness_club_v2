"use client";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar } from "@/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import NotificationMessage from "./notification-message";
import { useMediaQuery } from "@/hooks/use-media-query";
import FullScreen from "./full-screen";
import { Search } from "lucide-react";

const NavTools = ({ isDesktop, handleOpenSearch }: { isDesktop: boolean; handleOpenSearch: () => void; }) => {
  return (
    <div className="nav-tools flex items-center gap-1.5">
      {isDesktop && <FullScreen />}
      {!isDesktop && <button
        className="inline-flex gap-2 items-center text-default-600 text-sm"
        onClick={handleOpenSearch}
      >
        <Search className="h-4 w-4" />
      </button>}
      <ThemeButton />
      <NotificationMessage />
      <div className="pl-2">
        <ProfileInfo />
      </div>
    </div>
  );
};

const Header = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  const { collapsed } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <header
      className={cn("z-50 sticky top-0", {
        "xl:ml-[248px]": !collapsed,
        "xl:ml-[72px]": collapsed,
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
            handleOpenSearch={handleOpenSearch}
          />
          <NavTools
            isDesktop={isDesktop}
            handleOpenSearch={handleOpenSearch}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;