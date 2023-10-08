import { PropsWithChildren } from "react"

import MobileBaseLayout from "@/app/(public)/components/MobileBaseLayout"

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <MobileBaseLayout limitWidth>{children}</MobileBaseLayout>
)
export default AuthLayout
