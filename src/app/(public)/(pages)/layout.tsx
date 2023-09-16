import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

import Header from "../components/header"

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()
  return (
    <>
      {!isMobileView && <Header isMobileView={isMobileView} />}
      {children}
    </>
  )
}