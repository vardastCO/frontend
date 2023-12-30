// import { redirect } from "next/navigation"
// import { getServerSession } from "next-auth"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import PwaNotificationProvider from "@core/providers/PwaNotificationProvider"
// import { authOptions } from "@core/lib/authOptions"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
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
          <div className="container relative mx-auto flex h-full transform flex-col transition-all duration-200">
            <MobileScrollProvider>{children}</MobileScrollProvider>
          </div>
          <MobileNavigation />
          <PwaNotificationProvider isMobileView={isMobileView} />
        </>
      ) : (
        <div className="container mx-auto h-full bg-alpha-white p">
          {children}
        </div>
      )}
    </PublicProvider>
  )
}
