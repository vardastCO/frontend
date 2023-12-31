import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileScrollProvider from "@/app/(public)/components/header/MobileScrollProvider"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()

  return (
    <>
      {isMobileView ? (
        <>
          <div className="container relative mx-auto flex h-full transform flex-col transition-all duration-200">
            <MobileScrollProvider>{children}</MobileScrollProvider>
            <MobileNavigation />
          </div>
        </>
      ) : (
        <div className="container mx-auto h-full bg-alpha-white p">
          {children}
        </div>
      )}
    </>
  )
}
