"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LucideIcon,
  LucideLayoutGrid,
  LucideSearch,
  LucideUserCircle
} from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"

type NavbarItem = {
  href: string
  Icon: LucideIcon
  title: string
  id: number
}

const _navbar_items: NavbarItem[] = [
  {
    href: "/search",
    Icon: LucideSearch,
    title: "جستجو",
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
    title: "وردست من",
    id: 2
  }
]

type Props = {}

const MobileNavigation = (_: Props) => {
  const pathname = usePathname()

  const getActiveClassName = (activePath: string) => {
    const isActiveNav = !!pathname.includes(activePath)

    return isActiveNav
      ? "text-brand-600 dark:text-brand-500"
      : "text-gray-500 dark;text-gray-400"
  }

  return (
    <>
      <div
        className="h-[calc(64px+env(safe-area-inset-bottom))]"
        aria-hidden="true"
      ></div>
      <div className="fixed bottom-0 left-0 z-50 h-[calc(64px+env(safe-area-inset-bottom))] w-full border-gray-200 bg-gray-50 bg-opacity-50 backdrop-blur-xl dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-3 pb-[env(safe-area-inset-bottom)] font-medium">
          {_navbar_items.map(({ Icon, href, id, title }) => (
            <Link
              key={id}
              href={href}
              className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
              prefetch={false}
            >
              <Icon
                className={mergeClasses(
                  "mb-2 h-5 w-5",
                  getActiveClassName(href)
                )}
              />
              <span
                className={mergeClasses("text-sm", getActiveClassName(href))}
              >
                {title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileNavigation
