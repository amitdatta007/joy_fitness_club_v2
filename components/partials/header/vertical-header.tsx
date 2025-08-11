import { Search } from "lucide-react";
import { SiteLogo } from "@/components/svg";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";

const VerticalHeader = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      <div className="flex items-center md:gap-6 gap-1">
        {
          isDesktop ? <>
            <button
              className="inline-flex gap-2 items-center text-default-600 text-sm"
              onClick={handleOpenSearch}
            >
              <Search className=" h-4 w-4" />
              <span className=" md:block hidden">Search...</span>
            </button>
          </> : <>
            <MobileMenuHandler />
            <Link href="/dashboard" className=" text-primary ">
              <SiteLogo className="h-6 w-6" />
            </Link>
          </>
        }

      </div>
    </>
  );
};

export default VerticalHeader;
