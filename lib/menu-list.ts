import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LayoutGridIcon,
  Blocks,
  UtilityPole
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Unit",
          active: pathname.includes("/dashboard/unit"),
          icon: Blocks,
          submenus: [
            {
              href: "/dashboard/unit/create",
              label: "Create",
              active: pathname === "/dashboard/unit/create"
            },
            {
              href: "/dashboard/unit",
              label: "List",
              active: pathname === "/dashboard/unit"
            }
          ]
        },
        {
          href: "",
          label: "Utils",
          active: pathname.includes("/utils"),
          icon: UtilityPole,
          submenus: [
            {
              href: "/dashboard/utils/fee",
              label: "Fee",
              active: pathname === "/dashboard/utils/fee"
            },
            {
              href: "/dashboard/utils/coupon",
              label: "Coupon",
              active: pathname === "/dashboard/utils/coupon"
            },
          ]
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}