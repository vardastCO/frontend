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
import { QueryClientConfig } from "@tanstack/react-query"
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

import { NavigationType } from "@core/types/Navigation"

type NavbarItem = {
  href: string
  Icon: LucideIcon
  ActiveIcon: LucideIcon
  title: string
  id: number
}

export const _sidebarMenu: NavigationType[] = [
  {
    items: [
      {
        title: "خانه",
        path: "/admin",
        icon: "home"
      },
      {
        title: "کالاها",
        path: "/admin/products",
        icon: "package",
        abilities: "gql.products.product.index",
        items: [
          {
            title: "تمام کالاها",
            path: "/admin/products",
            icon: "package",
            abilities: "gql.products.product.index"
          },
          {
            title: "پیشنهادات",
            path: "/admin/offers",
            icon: "package",
            abilities: "gql.products.offer.index.mine"
          },
          {
            title: "مشخصه‌ها",
            path: "/admin/attributes",
            icon: "layers",
            abilities: "gql.products.attribute.index"
          },
          {
            title: "برندها",
            path: "/admin/brands",
            icon: "fingerprint",
            abilities: "gql.products.brand.index"
          },
          {
            title: "واحدهای اندازه‌گیری",
            path: "/admin/uoms",
            icon: "ruler",
            abilities: "gql.products.uom.index"
          }
        ]
      },
      {
        title: "فروشندگان",
        path: "/admin/sellers",
        icon: "store",
        abilities: "gql.products.seller.index"
      }
    ]
  },
  {
    title: "مدیریت",
    role: "admin",
    items: [
      {
        title: "دسته‌بندی‌ها",
        path: "/admin/vocabularies",
        icon: "layout-grid",
        abilities: "gql.base.taxonomy.vocabulary.index"
      },
      {
        title: "مناطق جغرافیایی",
        path: "/admin/locations",
        icon: "map",
        abilities: "gql.base.location.country.index"
      },
      {
        title: "کاربران",
        path: "/admin/users",
        icon: "users",
        abilities: "gql.users.user.index"
      }
    ]
  }
]

export type WithNavigationRouteItem = {
  forceEqual: boolean
  path: string
  dynamicRouteAllow?: boolean
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity
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
    forceEqual: true,
    path: "/categories"
  },
  {
    forceEqual: true,
    path: "/search"
  },
  {
    forceEqual: false,
    path: "/auth/signin"
  },
  {
    forceEqual: false,
    path: "/favorites"
  },
  {
    forceEqual: true,
    path: "/p"
  },
  {
    forceEqual: true,
    path: "/brand"
  },
  {
    forceEqual: true,
    path: "/seller"
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
    href: "/favorites",
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
