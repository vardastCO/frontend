"use client"

import { SSRProvider } from "react-aria"

type Props = {
  children: React.ReactNode
}

export default function ReactAriaSSRProvider({ children }: Props) {
  return <SSRProvider>{children}</SSRProvider>
}
