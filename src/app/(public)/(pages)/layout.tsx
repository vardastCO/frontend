import MobileNavigation from "@/app/(public)/components/mobile-navigation"

import Header from "../components/header"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <MobileNavigation />
    </>
  )
}
