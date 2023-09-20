"use client"

import { useContext } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { ArrowRight } from "lucide-react"

import { mergeClasses } from "@core/utils/mergeClasses"
import { Button } from "@core/components/ui/button"
import useIsCurrentPath from "@core/hooks/useIsCurrentPath"
import { _navbar_items, _withNavigationRoutes } from "@core/lib/constants"

import VerticalSpace from "./header/VerticalSpace"
import { PublicContext } from "./public-provider"
import Search from "./search"

type Props = {}

const MobileNavigation = (_: Props) => {
  const { showNavigationBackButton } = useContext(PublicContext)
  const { back } = useRouter()
  const [ShowNavigationBackButton] = useAtom(showNavigationBackButton)
  const pathname = usePathname()
  const hideSearchBarFlag = useIsCurrentPath(["", "profile", "search"])
  const getActiveClassName = (activePath: string) => {
    const isActiveNav = pathname.split("/")[1] === activePath.split("/")[1]

    return isActiveNav
      ? "text-primary-600 dark:text-primary-500"
      : "text-alpha-800 dark:text-alpha-900"
  }

  const isShowNavigation = () => {
    return _withNavigationRoutes.some((path) => pathname === path)
  }

  if (isShowNavigation()) {
    return (
      <>
        <div
          style={{
            paddingTop: hideSearchBarFlag ? "94px" : "140px"
          }}
        >
          <div
            style={{
              height: hideSearchBarFlag ? "94px" : "140px"
            }}
            className={`fixed bottom-0 left-0 z-50 w-full border-t border-alpha-200 bg-alpha-100 bg-opacity-50 pb-[20px] backdrop-blur-xl dark:border-alpha-600 dark:bg-alpha-700`}
          >
            {!hideSearchBarFlag && (
              <div className="flex h-[46px] gap-x-xs p-sm pb-0 pt-2xs">
                {ShowNavigationBackButton && (
                  <div>
                    <Button
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
            <div className="mx-auto grid h-[94px] max-w-lg grid-cols-4">
              {_navbar_items.map(({ Icon, href, id, title }) => (
                <Link
                  key={id}
                  href={href}
                  className="group inline-flex flex-col items-center justify-center py dark:hover:bg-alpha-800"
                  prefetch={false}
                >
                  <Icon
                    className={mergeClasses(
                      "mb-2 h-xl w-xl",
                      getActiveClassName(href)
                    )}
                  />
                  <span
                    className={mergeClasses(
                      "text-sm",
                      getActiveClassName(href)
                    )}
                  >
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
  return null
}

export default MobileNavigation
