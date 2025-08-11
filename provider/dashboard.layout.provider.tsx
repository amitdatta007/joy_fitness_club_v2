"use client";
import { ReactNode, useState } from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Footer from "@/components/partials/footer";
import HeaderSearch from "@/components/header-search";
import { useMounted } from "@/hooks/use-mounted";
import LayoutLoader from "@/components/layout-loader";
import { useSidebar } from "@/store";

const DashBoardLayoutProvider = ({ children }: { children: ReactNode; }) => {
  const [open, setOpen] = useState(false);
  const location = usePathname();
  const mounted = useMounted();
  const { collapsed } = useSidebar();

  if (!mounted) {
    return <LayoutLoader />;
  }
  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} />
      <Sidebar />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "xl:ml-[248px]": !collapsed,
          "xl:ml-[72px]": collapsed,
        })}
        style={{ overflow: "hidden" }}
      >
        <div
          className={cn(
            "px-6 py-6  page-min-height"
          )}
        >
          <LayoutWrapper
            setOpen={setOpen}
            open={open}
            location={location}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>

      <Footer handleOpenSearch={() => setOpen(true)} />
    </>
  );

};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({ children, setOpen, open, location }: { children: React.ReactNode, setOpen: any, open: boolean, location: any, }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
