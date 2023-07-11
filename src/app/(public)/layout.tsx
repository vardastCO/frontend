import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileCategoriesFilter from "@/app/(public)/components/mobile-categories-filter"
import MobileFilters from "@/app/(public)/components/mobile-filters"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import MobileSortFilter from "@/app/(public)/components/mobile-sort-filter"
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
          <MobileCategoriesFilter />
          <MobileSortFilter />
          <MobileFilters />
        </>
      )}
      {children}
      {isMobileView && <MobileNavigation />}
    </PublicProvider>
  )
}
