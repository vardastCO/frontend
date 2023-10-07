import {
  BookmarkIcon,
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon
} from "@heroicons/react/24/outline"
import {
  BookmarkIcon as SolidBookmarkIcon,
  HomeIcon as SolidHomeIcon,
  Squares2X2Icon as SolidSquares2X2Icon,
  UserCircleIcon as SolidUserCircleIcon
} from "@heroicons/react/24/solid"
import {
  // LucideBookmark,
  LucideGlobe,
  // LucideHome,
  LucideIcon,
  LucideInfo,
  // LucideLayoutGrid,
  LucideMail,
  LucideMapPin,
  LucideNewspaper,
  LucidePhone,
  LucidePhoneIncoming
  // LucideUserCircle
} from "lucide-react"

type NavbarItem = {
  href: string
  Icon: LucideIcon
  ActiveIcon: LucideIcon
  title: string
  id: number
}

export type WithNavigationRouteItem = {
  forceEqual: boolean
  path: string
}

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
}

export const _withNavigationRoutes: WithNavigationRouteItem[] = [
  {
    forceEqual: false,
    path: "/"
  },
  {
    forceEqual: false,
    path: "/profile"
  },
  {
    forceEqual: false,
    path: "/categories"
  },
  {
    forceEqual: true,
    path: "/search"
  },
  {
    forceEqual: false,
    path: "/profile/auth/signin"
  }
]

export const _navbar_items: NavbarItem[] = [
  {
    href: "/",
    Icon: HomeIcon,
    ActiveIcon: SolidHomeIcon,
    title: "خانه",
    id: 0
  },
  {
    href: "/categories",
    Icon: Squares2X2Icon,
    ActiveIcon: SolidSquares2X2Icon,
    title: "دسته‌بندی",
    id: 1
  },
  {
    href: "/bookmarks",
    Icon: BookmarkIcon,
    ActiveIcon: SolidBookmarkIcon,
    title: "علاقه‌مندی",
    id: 2
  },
  {
    href: "/profile",
    Icon: UserCircleIcon,
    ActiveIcon: SolidUserCircleIcon,
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
