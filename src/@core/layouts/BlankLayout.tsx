import { ReactNode } from "react"

interface BlankLayoutProps {
  children: ReactNode
}

export default function BlankLayout({ children }: BlankLayoutProps) {
  return <div>{children}</div>
}
