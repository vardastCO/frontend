import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
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
      {children}
      {isMobileView && <MobileNavigation />}
    </PublicProvider>
  )
}
