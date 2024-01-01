// import { redirect } from "next/navigation"
// import { getServerSession } from "next-auth"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import PwaNotificationProvider from "@core/providers/PwaNotificationProvider"
// import { authOptions } from "@core/lib/authOptions"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import DesktopFooter from "@/app/(public)/components/desktop/DesktopFooter"
import MobileScrollProvider from "@/app/(public)/components/header/MobileScrollProvider"
import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import PublicProvider from "@/app/(public)/components/public-provider"
import { SearchActionModal } from "@/app/(public)/components/search"

export default async function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()

  // const session = await getServerSession(authOptions)

  // if (!session) redirect("/auth/signin")

  return (
    <PublicProvider>
      <SearchActionModal isMobileView={isMobileView} />
      <SellerContactModal />
      {isMobileView ? (
        <>
          <MobileScrollProvider>{children}</MobileScrollProvider>
          <MobileNavigation />
          <PwaNotificationProvider isMobileView={isMobileView} />
        </>
      ) : (
        <div className="flex flex-col">
          <div className="container mx-auto h-full bg-alpha-white p">
            {children}
          </div>
          <DesktopFooter />
        </div>
      )}
    </PublicProvider>
  )
}
