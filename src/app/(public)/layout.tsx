import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileGlobalCategoriesFilter from "@/app/(public)/components/mobile-global-categories-filter"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import PublicProvider from "@/app/(public)/components/public-provider"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()

  return (
    <PublicProvider>
      {isMobileView && (
        <>
          <MobileGlobalCategoriesFilter />
        </>
      )}
      {children}
      {isMobileView && <MobileNavigation />}
    </PublicProvider>
  )
}
