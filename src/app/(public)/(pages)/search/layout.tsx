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
        "container mx-auto px-4 pt-1",
        isMobileView ? "" : "md:py-8"
      ])}
    >
      <div>{children}</div>
    </div>
  )
}
