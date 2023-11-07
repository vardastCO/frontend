import { PropsWithChildren } from "react"

import withMobileHeader from "@core/middlewares/withMobileHeader"
import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <MobileBaseLayout>{children}</MobileBaseLayout>
)
export default withMobileHeader(Layout, {
  title: "درباره ما"
})
