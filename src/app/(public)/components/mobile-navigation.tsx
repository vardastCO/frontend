"use client"

import { useContext, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAtom } from "jotai"
import { ArrowRight } from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"
import { Button } from "@core/components/ui/button"
import useIsCurrentPath from "@core/hooks/useIsCurrentPath"
import { _navbar_items, _withNavigationRoutes } from "@core/lib/constants"

import { PublicContext } from "./public-provider"
import Search from "./search"

type Props = {}

const MobileNavigation = (_: Props) => {
  const { showNavigationBackButton } = useContext(PublicContext)
  const [ShowNavigationBackButton, setShowNavigationBackButton] = useAtom(
    showNavigationBackButton
  )
  const pathname = usePathname()
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
  const getIsActiveNav = (activePath: string) =>
    pathname.split("/")[1] === activePath.split("/")[1]
  const getActiveClassName = (activePath: string) => {
    const isActiveNav = getIsActiveNav(activePath)

    return isActiveNav
      ? "text-primary-600 dark:text-primary-500"
      : "text-alpha-800 dark:text-alpha-900"
  }

  const isShowNavigation = () => {
    return _withNavigationRoutes.some(({ path, forceEqual }) =>
      forceEqual ? pathname.includes(path) : pathname === path
    )
  }

  useEffect(() => {
    setShowNavigationBackButton(false)
  }, [pathname, setShowNavigationBackButton])

  if (isShowNavigation()) {
    return (
      <div className={hideSearchBarFlag ? "pb-[60px]" : "pb-[110px]"}>
        <div
          className={`fixed bottom-0 left-0 z-50 w-full border-t border-alpha-200 bg-alpha-white bg-opacity-5 backdrop-blur-xl dark:border-alpha-600 dark:bg-alpha-700`}
        >
          <div className="">
            {!hideSearchBarFlag && (
              <div className="flex gap-x px-8 pt">
                {ShowNavigationBackButton && (
                  <div className="h-full">
                    <Button
                      // variant="ghost"
                      block
                      onClick={() => {
                        document.getElementById("header-back-button")?.click()
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
            <div className="grid w-full max-w-lg grid-cols-4 bg-alpha-white bg-opacity-5">
              {_navbar_items.map(({ Icon, ActiveIcon, href, id, title }) => {
                const ShowedIcon = getIsActiveNav(href) ? ActiveIcon : Icon
                return (
                  <Link
                    key={id}
                    href={href}
                    className="group inline-flex h-full flex-col items-center justify-center pb-[calc(env(safe-area-inset-bottom)*0.5+10px)] pt"
                    prefetch={false}
                  >
                    <ShowedIcon
                      className={mergeClasses(
                        "mb-1 h-7 w-7",
                        getActiveClassName(href)
                      )}
                    />
                    <p
                      className={mergeClasses(
                        "text-xs",
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
      </div>
    )
  }
  return null
}

export default MobileNavigation
