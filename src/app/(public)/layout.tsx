import MobileNavigation from "@/app/(public)/components/mobile-navigation"
import PublicProvider from "@/app/(public)/components/public-provider"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <PublicProvider>
      {children}
      <MobileNavigation />
    </PublicProvider>
  )
}
