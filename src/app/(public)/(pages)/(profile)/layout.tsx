import { PropsWithChildren } from "react"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const isMobileView = CheckIsMobileView()

  return (
    <MobileBaseLayout extraPadding background bgWhite={isMobileView}>
      {children}
    </MobileBaseLayout>
  )
}
export default Layout
