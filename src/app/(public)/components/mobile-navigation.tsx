"use client"

import { useContext, useEffect, useLayoutEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom, useSetAtom } from "jotai"
import { ArrowRight } from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"
import Link from "@core/components/shared/Link"
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
    // {
    //   forceEqual: false,
    //   path: "profile"
    // }
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
      path: "products"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "product"
    },
    {
      forceEqual: true,
      dynamicRouteAllow: true,
      path: "brands"
    },
    {
      forceEqual: true,
      dynamicRouteAllow: true,
      path: "sellers"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "brand"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "profile/privacy"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "profile/contact"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "profile/about"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "seller"
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

  useLayoutEffect(() => {
    setNavigationHeight(ref?.current?.clientHeight)
  }, [setNavigationHeight])

  useEffect(() => {
    ref?.current?.focus()
  }, [pathname])

  if (isShowNavigation()) {
    return (
      <div
        ref={ref}
        id="mobile-navigation-bar"
        className={`${
          showNavbarScroll ? "" : "translate-y-[5rem]"
        } fixed bottom-0 left-0 z-50 w-full transform border-t border-alpha-200 bg-alpha-white transition-all duration-300 dark:border-alpha-600 dark:bg-alpha-700`}
      >
        {/* <Progress /> */}
        <div>
          {!hideSearchBarFlag && (
            <div className="flex gap-x px-8 pt-2.5">
              <AnimatePresence>
                {ShowNavigationBackButton && (
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, x: 100, display: "none" }}
                    animate={{ opacity: 1, x: 0, display: "block" }}
                    exit={{ opacity: 0, x: 100, display: "none" }}
                    className="h-full"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="w-full transform transition-all delay-300 duration-300">
                <Search isMobileView={true} />
              </div>
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
                      "h-7 w-7 transform transition-all",
                      showNavbarScroll ? "" : "my-2",
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
