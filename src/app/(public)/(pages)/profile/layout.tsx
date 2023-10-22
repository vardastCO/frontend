import { PropsWithChildren } from "react"

import withMobileHeader from "@core/middlewares/withMobileHeader"
import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MobileBaseLayout limitWidth bgWhite spaceLess>
      {children}
    </MobileBaseLayout>
  )
}

export default withMobileHeader(Layout, { title: "حساب کاربری" })
