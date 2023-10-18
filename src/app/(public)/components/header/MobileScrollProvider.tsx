"use client"

import { PropsWithChildren, useContext, useState } from "react"
import { useSetAtom } from "jotai"

import { PublicContext } from "@/app/(public)/components/public-provider"

const MobileScrollProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { showNavbar } = useContext(PublicContext)
  const setShowNavbarScroll = useSetAtom(showNavbar)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  return (
    <div className="container mx-auto flex h-full transform flex-col pb-16 transition-all duration-200">
      <div
        onScroll={(e: any) => {
          var st = e.target?.scrollTop
          const showNavbarFlag = st === 0 ? true : st < lastScrollTop
          setShowNavbarScroll(showNavbarFlag)
          setLastScrollTop(st <= 0 ? 0 : st)
        }}
        className={`flex flex-1 flex-col overflow-y-auto
        pb-[calc(env(safe-area-inset-bottom)*1.1)]`}
      >
        {children}
      </div>
    </div>
  )
}

export default MobileScrollProvider
