import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import PwaNotificationProvider from "@core/providers/PwaNotificationProvider"
import MobileScrollProvider from "@/app/(public)/components/header/MobileScrollProvider"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import PublicProvider from "@/app/(public)/components/public-provider"
import { SearchActionModal } from "@/app/(public)/components/search"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()

  return (
    <PublicProvider>
      <SearchActionModal isMobileView={isMobileView} />
      {isMobileView ? (
        <>
          <PwaNotificationProvider isMobileView={isMobileView} />
          <MobileScrollProvider>{children}</MobileScrollProvider>
          <MobileNavigation />
        </>
      ) : (
        <div className="container mx-auto h-full bg-alpha-white p">
          {children}
        </div>
      )}
    </PublicProvider>
  )
}
