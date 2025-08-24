import type { NavigationGroup } from "@/features/navigation/navigation.type";
import { CreditCard, Home, Settings, TriangleAlert, User } from "lucide-react";

const APP_PATH = "/app";

export const APP_LINKS: NavigationGroup[] = [
  {
    title: "Menu",
    links: [
      {
        href: APP_PATH,
        Icon: Home,
        label: "Dashboard",
      },
      {
        href: `${APP_PATH}/users`,
        Icon: User,
        label: "Analytics",
      },
    ],
  },
  {
    title: "Account",
    defaultOpenStartPath: `${APP_PATH}/settings`,
    links: [
      {
        href: `${APP_PATH}/settings`,
        Icon: Settings,
        label: "Settings",
      },
      {
        href: `${APP_PATH}/settings/billing`,
        Icon: CreditCard,
        label: "Billing",
      },
      {
        href: `${APP_PATH}/settings/danger`,
        Icon: TriangleAlert,
        label: "Danger Zone",
      },
    ],
  },
] satisfies NavigationGroup[];
