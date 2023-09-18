"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mergeClasses } from "@core/utils/mergeClasses"
import { _navbar_items, _withNavigationRoutes } from "@core/lib/constants"

import VerticalSpace from "./header/VerticalSpace"

type Props = {}

const MobileNavigation = (_: Props) => {
  const pathname = usePathname()

  const getActiveClassName = (activePath: string) => {
    const isActiveNav = pathname.split("/")[1] === activePath.split("/")[1]

    return isActiveNav
      ? "text-primary-600 dark:text-primary-500"
      : "text-alpha-500 dark;text-alpha-400"
  }

  const isShowNavigation = () => {
    return _withNavigationRoutes.some((path) => pathname === path)
  }

  if (isShowNavigation()) {
    return (
      <>
        <VerticalSpace />
        <div className="fixed bottom-0 left-0 z-50 h-[calc(64px+env(safe-area-inset-bottom))] w-full border-alpha-200 bg-alpha-50 bg-opacity-50 backdrop-blur-xl dark:border-alpha-600 dark:bg-alpha-700">
          <div className="mx-auto grid h-full max-w-lg grid-cols-3 pb-[env(safe-area-inset-bottom)] font-medium">
            {_navbar_items.map(({ Icon, href, id, title }) => (
              <Link
                key={id}
                href={href}
                className="group inline-flex flex-col items-center justify-center px-5 hover:bg-alpha-50 dark:hover:bg-alpha-800"
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
  return null
}

export default MobileNavigation
