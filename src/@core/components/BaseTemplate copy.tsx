"use client"

import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useSetAtom } from "jotai"

import { PublicContext } from "@/app/(public)/components/public-provider"

const variants = {
  hidden: { opacity: 0, y: 0, x: 0 },
  enter: { opacity: 1, y: 0, x: 0 }
}

const BaseTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const { showNavbar } = useContext(PublicContext)
  const setShowNavbarScroll = useSetAtom(showNavbar)
  const [hasScrollbar, setHasScrollbar] = useState({
    top: 0,
    bottom: 0
  })
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const ref = useRef<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (window.document.getElementById("mobile-navigation-bar")?.clientHeight) {
      setHasScrollbar({
        bottom:
          window.document.getElementById("mobile-navigation-bar")
            ?.clientHeight ?? 0,
        top:
          window.document.getElementById("mobile-header-navbar")
            ?.clientHeight ?? 0
      })
    }
  }, [pathname])

  return (
    <div className="container relative mx-auto flex h-full transform flex-col transition-all duration-200">
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        onScroll={(e: any) => {
          var st = e.target?.scrollTop
          const showNavbarFlag = st === 0 ? true : st < lastScrollTop
          setShowNavbarScroll(showNavbarFlag)
          setLastScrollTop(st <= 0 ? 0 : st)
        }}
        ref={ref}
        style={{
          paddingBottom: hasScrollbar.bottom,
          paddingTop: hasScrollbar.top
        }}
        className="flex flex-1 flex-col overflow-y-auto bg-transparent"
      >
        {children}
      </motion.main>
    </div>
  )
}

export default BaseTemplate
