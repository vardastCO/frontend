"use client"

import { useContext, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAtom, useSetAtom } from "jotai"
import { ArrowRight } from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"
import { Button } from "@core/components/ui/button"
import useIsCurrentPath from "@core/hooks/useIsCurrentPath"
import { _navbar_items, _withNavigationRoutes } from "@core/lib/constants"
import { PublicContext } from "@/app/(public)/components/public-provider"

import Search from "./search"

type Props = {}

const MobileNavigation = (_: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const { showNavbar, navigationHeight } = useContext(PublicContext)
  const [showNavbarScroll] = useAtom(showNavbar)
  const ref = useRef<any>(null)
  const setNavigationHeight = useSetAtom(navigationHeight)
  const hideSearchBarFlag = useIsCurrentPath([
    {
      forceEqual: false,
      path: ""
    },
    {
      forceEqual: false,
      path: "profile"
    }
  ])
  const ShowNavigationBackButton = useIsCurrentPath([
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "categories"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "search"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "p"
    }
  ])
  const getIsActiveNav = (activePath: string) =>
    pathname.split("/")[1] === activePath.split("/")[1]
  const getActiveClassName = (activePath: string) => {
    const isActiveNav = getIsActiveNav(activePath)

    return isActiveNav
      ? "text-primary-600 dark:text-primary-500"
      : "text-alpha-500 dark:text-alpha-900"
  }

  const isShowNavigation = () => {
    return _withNavigationRoutes.some(({ path, forceEqual }) =>
      forceEqual ? pathname.includes(path) : pathname === path
    )
  }

  useEffect(() => {
    setNavigationHeight(ref?.current?.clientHeight)
  }, [setNavigationHeight])

  if (isShowNavigation()) {
    return (
      <div
        ref={ref}
        className={`${
          showNavbarScroll ? "bottom-0" : "-bottom-[5rem]"
        } fixed left-0 z-50 w-full transform border-t border-alpha-200 bg-alpha-white bg-opacity-5 backdrop-blur-xl transition-all duration-300 dark:border-alpha-600 dark:bg-alpha-700`}
      >
        <div>
          {!hideSearchBarFlag && (
            <div className="flex gap-x px-8 pt-2.5">
              {ShowNavigationBackButton && (
                <div className="h-full">
                  <Button
                    // variant="ghost"
                    block
                    onClick={() => {
                      router.back()
                    }}
                    iconOnly
                  >
                    <ArrowRight className="" />
                  </Button>
                </div>
              )}
              <Search isMobileView={true} />
            </div>
          )}
          <div className="grid w-full grid-cols-4 bg-alpha-white bg-opacity-5">
            {_navbar_items.map(({ Icon, ActiveIcon, href, id, title }) => {
              const ShowedIcon = getIsActiveNav(href) ? ActiveIcon : Icon
              return (
                <Link
                  key={id}
                  href={href}
                  className={`group inline-flex h-full flex-col items-center justify-center pb-[calc(env(safe-area-inset-bottom)*0.5+10px)] pt`}
                  prefetch={false}
                >
                  <ShowedIcon
                    className={mergeClasses(
                      "h-7 w-7",
                      showNavbarScroll ? "mb-1 " : "my-2",
                      getActiveClassName(href)
                    )}
                  />
                  <p
                    className={mergeClasses(
                      "text-xs font-bold",
                      getActiveClassName(href)
                    )}
                  >
                    {title}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default MobileNavigation
