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
      {isMobileView ? (
        <div className="container mx-auto flex h-full flex-col">
          <div
            className={`flex flex-1 flex-col ${
              isMobileView ? "overflow-y-scroll" : ""
            }`}
          >
            {children}
          </div>
          {isMobileView && <MobileNavigation />}
        </div>
      ) : (
        <div className="container mx-auto">{children}</div>
      )}
    </PublicProvider>
  )
}
