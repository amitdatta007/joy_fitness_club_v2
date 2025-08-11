
import {
  Cart,
  ClipBoard,
  ClipBoard2,
  DashBoard, Graph, Note2, Note3, Stacks, Stacks2, Users, Settings

} from "@/components/svg";
import { Box } from "lucide-react";


export interface MenuItemProps {
  isHeader?: boolean;
  title: string;
  icon?: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[]
  nested?: MenuItemProps[]
  onClick?: () => void;
}

export const menusConfig: MenuItemProps[] = [
  {
    isHeader: true,
    title: "menu",
  },
  {
    title: "Dashboard",
    icon: DashBoard,
    href: '/dashboard'
  },

  {
    title: "Members",
    icon: Users,
    child: [
      {
        title: "New Members",
        href: "/members/new",
      },
      {
        title: "All Members",
        href: "/members",
      },
      {
        title: "Member By Status",
        multi_menu: [
          {
            title: "Active Members",
            href: "/members/active",
          },
          {
            title: "Inactive Members",
            href: "/members/inactive",
          },
          {
            title: "Deleted Members",
            href: "/members/deleted",
          },
        ],
      },


    ],

  },
  {
    title: "Memberships",
    icon: Users,
    child: [
      {
        title: "Active Membership",
        href: "/membership/active",
      },
      {
        title: "All Membership",
        href: "/membership",
      },
    ],
  },
  {
    title: "Reports",
    icon: Users,
    child: [
      {
        title: "Active Membership",
        href: "/membership/active",
      },
      {
        title: "All Membership",
        href: "/membership",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: '/settings'
  },
  
]
