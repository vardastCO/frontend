import clsx from "clsx"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

export default function SearchLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isMobileView = CheckIsMobileView()
  return (
    <div
      className={clsx([
        "container mx-auto",
        isMobileView ? "" : "pt-1 md:py-8"
      ])}
    >
      {children}
    </div>
  )
}
