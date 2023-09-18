import { Children, cloneElement } from "react"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import PublicProvider from "@/app/(public)/components/public-provider"

import { MobileSearchBar } from "./components/header/MobileSearchBar"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()

  return (
    <PublicProvider>
      <div className="container mx-auto flex h-full flex-col">
        {Children.map(children, (element) => {
          return cloneElement(element as React.ReactElement<any>, {})
        })}
        {isMobileView && <MobileSearchBar isMobileView={isMobileView} />}
        {isMobileView && <MobileNavigation />}
      </div>
    </PublicProvider>
  )
}
