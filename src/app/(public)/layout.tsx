import MobileNavigation from "@/app/(public)/components/mobile-nav"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <MobileNavigation />
    </>
  )
}
