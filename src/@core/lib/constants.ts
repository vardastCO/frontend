import {
  LucideBookmark,
  LucideGlobe,
  LucideHome,
  LucideIcon,
  LucideInfo,
  LucideLayoutGrid,
  LucideMail,
  LucideMapPin,
  LucideNewspaper,
  LucidePhone,
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

export const _withNavigationRoutes: string[] = ["/", "/profile", "/categories"]

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
    title: "دسته‌بندی",
    id: 1
  },
  {
    href: "/bookmarks",
    Icon: LucideBookmark,
    title: "علاقه‌مندی",
    id: 2
  },
  {
    href: "/profile",
    Icon: LucideUserCircle,
    title: "حساب کاربری",
    id: 3
  }
]

export const _about_items = [
  { Icon: LucideGlobe, href: "" },

  { Icon: LucideMail, href: "" },

  { Icon: LucidePhoneIncoming, href: "" },

  { Icon: LucideMapPin, href: "" }
]

export const _profile_items = [
  // {
  //   href: "/profile/faq",
  //   Icon: LucideShieldQuestion,
  //   title: "سوالات متداول",
  //   id: 0
  // },
  {
    href: "/profile/privacy",
    Icon: LucideNewspaper,
    title: "قوانین و مقررات",
    id: 1
  },
  {
    href: "/profile/contact",
    Icon: LucidePhone,
    title: "تماس با ما",
    id: 2
  },
  {
    href: "/profile/about",
    Icon: LucideInfo,
    title: "درباره ما",
    id: 3
  }
]
