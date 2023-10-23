import { PropsWithChildren } from "react"

import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MobileBaseLayout limitWidth bgWhite>
      {children}
    </MobileBaseLayout>
  )
}

export default Layout
