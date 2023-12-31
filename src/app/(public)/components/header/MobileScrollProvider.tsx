"use client"

import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useSetAtom } from "jotai"

import { PublicContext } from "@/app/(public)/components/public-provider"

const variants = {
  hidden: { opacity: 0, y: 0 },
  enter: { opacity: 1, y: 0 }
}

const MobileScrollProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { showNavbar } = useContext(PublicContext)
  const [realScrollbarHeight, setRealScrollbarHeight] = useState(0)
  const setShowNavbarScroll = useSetAtom(showNavbar)
  const [hasScrollbar, setHasScrollbar] = useState({
    top: 0,
    bottom: 0
  })
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const ref = useRef<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.document?.getElementById("mobile-navigation-bar")?.clientHeight
    ) {
      setHasScrollbar({
        bottom:
          window?.document?.getElementById("mobile-navigation-bar")
            ?.clientHeight ?? 0,
        top:
          window?.document?.getElementById("mobile-header-navbar")
            ?.clientHeight ?? 0
      })
    }
    if (
      typeof window !== "undefined" &&
      window?.document?.getElementById("bottom-navigation-buy-box")
        ?.clientHeight
    ) {
      setHasScrollbar({
        bottom:
          window?.document?.getElementById("bottom-navigation-buy-box")
            ?.clientHeight ?? 0,
        top:
          window?.document?.getElementById("mobile-header-navbar")
            ?.clientHeight ?? 0
      })
    }
    if (
      typeof window !== "undefined" &&
      window?.document?.getElementById("scroll-container")
    ) {
      const sh =
        window?.document?.getElementById("scroll-container")?.scrollHeight
      const ch =
        window?.document?.getElementById("scroll-container")?.clientHeight
      setRealScrollbarHeight((sh || 0) - (ch || 0))
    }
    if (ref?.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, [pathname])

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      className="container relative mx-auto flex h-full transform flex-col transition-all duration-200"
    >
      <div
        id="scroll-container"
        onScroll={(e: any) => {
          var st = e.target?.scrollTop
          const showNavbarFlag =
            st === 0 || st >= realScrollbarHeight ? true : st < lastScrollTop
          setShowNavbarScroll(showNavbarFlag)
          setLastScrollTop(st <= 0 ? 0 : st)

          //         const showNavbarFlag =
          //   st <= 10 || st >= realScrollbarHeight - 10 || lastScrollTop - st > 2
          // // ? true
          // // : st > realScrollbarHeight || st - realScrollbarHeight > 2
          // setShowNavbarScroll(showNavbarFlag)
          // setLastScrollTop(st <= 0 ? 0 : st)
        }}
        ref={ref}
        style={{
          paddingBottom: hasScrollbar.bottom,
          paddingTop: hasScrollbar.top
        }}
        className={clsx(
          // hasScrollbar
          //   ? "pb-[calc(env(safe-area-inset-bottom)+5rem)]"
          //   : "pb-[calc(env(safe-area-inset-bottom)+5rem)]",
          "flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-transparent"
        )}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default MobileScrollProvider
