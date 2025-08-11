"use client";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const SubMenuHandler = ({
  item,
  toggleSubmenu,
  index,
  activeSubmenu,
}: {
  item: any;
  toggleSubmenu: any;
  index: number;
  activeSubmenu: number | null;
}) => {
  const { title } = item;

  return (
    <div
      onClick={() => toggleSubmenu(index)}
      className={cn(
        "flex  text-default-700 font-medium text-sm capitalize px-[10px] py-3 rounded cursor-pointer transition-all duration-100 hover:bg-primary hover:text-primary-foreground group",
        {
          "bg-primary  text-primary-foreground": activeSubmenu === index,
        }
      )}
    >
      <div className="flex-1  gap-3 flex items-start">
        <span className="inline-flex items-center  text-lg ">
          <item.icon className="w-5 h-5" />
        </span>
        <div className=" ">{title}</div>
      </div>
      <div className="flex-0">
        <div
          className={cn(
            " text-base rounded-full flex justify-center items-center transition-all duration-300 group-hover:text-primary-foreground",
            {
              "rotate-90  ": activeSubmenu === index,
              " text-default-500  ": activeSubmenu !== index,
            }
          )}
        >
          <Icon
            icon="heroicons:chevron-right-20-solid"
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
};

export default SubMenuHandler;