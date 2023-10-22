import { PropsWithChildren } from "react"

import withMobileHeader from "@core/middlewares/withMobileHeader"
import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <MobileBaseLayout bgWhite>{children}</MobileBaseLayout>
)
export default withMobileHeader(Layout, {
  hasBack: {
    hidden: true
  },
  shareIcon: {}
})
