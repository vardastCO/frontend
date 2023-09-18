import {
  LucideGlobe,
  LucideHome,
  LucideIcon,
  LucideLayoutGrid,
  LucideMail,
  LucideMapPin,
  LucidePhoneIncoming,
  LucideUserCircle
} from "lucide-react"

type NavbarItem = {
  href: string
  Icon: LucideIcon
  title: string
  id: number
}
export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
}

export const _withNavigationRoutes: string[] = ["/", "/profile"]

export const _navbar_items: NavbarItem[] = [
  {
    href: "/",
    Icon: LucideHome,
    title: "خانه",
    id: 0
  },
  {
    href: "/categories",
    Icon: LucideLayoutGrid,
    title: "دسته‌بندی‌ها",
    id: 1
  },
  {
    href: "/profile",
    Icon: LucideUserCircle,
    title: "حساب کاربری",
    id: 2
  }
]

export const _about_items = [
  { Icon: LucideGlobe, href: "" },

  { Icon: LucideMail, href: "" },

  { Icon: LucidePhoneIncoming, href: "" },

  { Icon: LucideMapPin, href: "" }
]
