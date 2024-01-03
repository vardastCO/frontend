"use client"

import { useContext, useEffect, useLayoutEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ClientError } from "graphql-request"
import { useAtom, useSetAtom } from "jotai"
import { ArrowRight } from "lucide-react"
import { useSession } from "next-auth/react"

import {
  EventTrackerSubjectTypes,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import Link from "@core/components/shared/Link"
import Progress from "@core/components/shared/Progress"
import { Button } from "@core/components/ui/button"
import { toast } from "@core/hooks/use-toast"
import useIsCurrentPath from "@core/hooks/useIsCurrentPath"
import { _navbar_items, _withNavigationRoutes } from "@core/lib/constants"
import { PublicContext } from "@/app/(public)/components/public-provider"

import Search from "./search"

type Props = {}

const MobileNavigation = (_: Props) => {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const {
    showNavbar,
    navigationHeight,
    contactModalVisibilityAtom,
    contactModalDataAtom
  } = useContext(PublicContext)
  const [showNavbarScroll] = useAtom(showNavbar)
  const setOpen = useSetAtom(contactModalVisibilityAtom)
  const [{ data, type, title }] = useAtom(contactModalDataAtom)
  const ref = useRef<any>(null)
  const setNavigationHeight = useSetAtom(navigationHeight)
  const hideSearchBarFlag = useIsCurrentPath([
    // {
    //   forceEqual: false,
    //   path: "profile"
    // }
  ])
  const showBuyBoxFlag = useIsCurrentPath([
    {
      forceEqual: false,
      path: "seller"
    },
    {
      forceEqual: false,
      path: "product"
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
      forceEqual: true,
      dynamicRouteAllow: true,
      path: "privacy"
    },
    {
      forceEqual: true,
      dynamicRouteAllow: true,
      path: "contact"
    },
    {
      forceEqual: true,
      dynamicRouteAllow: true,
      path: "about"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "seller"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "auth/signin"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "auth/signup"
    },
    {
      forceEqual: false,
      dynamicRouteAllow: true,
      path: "auth/reset"
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

  const createEventTrackerMutation = useCreateEventTrackerMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        setOpen(true)
      },
      onError: (errors: ClientError) => {
        router.push("/auth/signin")
        if (
          errors.response.errors?.find(
            (error) => error.extensions?.code === "FORBIDDEN"
          )
        ) {
          // toast({
          //   description:
          //     "لطفا برای مشاهده اطلاعات تماس، ابتدا وارد حساب کاربری خود شوید.",
          //   duration: 8000,
          //   variant: "default"
          // })
          console.log("redirect to login for FORBIDDEN contact visit")

          router.push("/auth/signin")
        } else {
          toast({
            description: (
              errors.response.errors?.at(0)?.extensions
                .displayErrors as string[]
            ).map((error) => error),
            duration: 8000,
            variant: "default"
          })
        }
      }
    }
  )

  const showSellerContact = () => {
    if (!!session.data) {
      createEventTrackerMutation.mutate({
        createEventTrackerInput: {
          type,
          subjectType: EventTrackerSubjectTypes.ContactInfo,
          subjectId: data?.contacts?.at(0)?.id || 0,
          url: window.location.href
        }
      })
      return
    }
    router.push("/auth/signin")
  }

  useLayoutEffect(() => {
    setNavigationHeight(ref?.current?.clientHeight)
  }, [setNavigationHeight])

  useEffect(() => {
    ref?.current?.focus()
  }, [pathname])

  if (isShowNavigation()) {
    return (
      <>
        <div
          ref={ref}
          id="mobile-navigation-bar"
          className={`${
            showBuyBoxFlag || showNavbarScroll ? "" : "translate-y-[5rem]"
          } fixed bottom-0 left-0 z-50 w-full transform border-t border-alpha-200 bg-alpha-white pb-[calc(env(safe-area-inset-bottom)*0.5+6px)] transition-all duration-300 dark:border-alpha-600 dark:bg-alpha-700`}
        >
          {/* <Progress /> */}
          <div>
            {(showBuyBoxFlag || !hideSearchBarFlag) && (
              <div className="flex gap-x px-8 py-2.5">
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

                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, x: 0, display: "none" }}
                    animate={{ opacity: 1, x: 0, display: "block" }}
                    exit={{ opacity: 0, x: 0, display: "none" }}
                    className="w-full transform transition-all delay-300 duration-300"
                  >
                    {showBuyBoxFlag ? (
                      <>
                        <Button
                          onClick={showSellerContact}
                          loading={createEventTrackerMutation.isLoading}
                          disabled={createEventTrackerMutation.isLoading}
                          className="btn btn-md btn-primary
                            relative
                            flex
                            h-full
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-4
                            py-3
                            font-semibold"
                        >
                          <span className="relative flex flex-col items-center justify-center">
                            {title}
                          </span>
                          <Progress reverseBg />
                        </Button>
                      </>
                    ) : (
                      <Search isMobileView={true} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            {!showBuyBoxFlag && (
              <div className="grid w-full grid-cols-4 bg-alpha-white bg-opacity-5">
                {_navbar_items.map(({ Icon, ActiveIcon, href, id, title }) => {
                  const ShowedIcon = getIsActiveNav(href) ? ActiveIcon : Icon
                  return (
                    <Link
                      key={id}
                      href={href}
                      className={`group inline-flex h-full flex-col items-center justify-center gap-y-0.5 pt-3`}
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
            )}
          </div>
        </div>
      </>
    )
  }
  return null
}

export default MobileNavigation
