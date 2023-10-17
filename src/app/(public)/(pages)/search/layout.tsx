import clsx from "clsx"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

function SearchLayout({ children }: { children: React.ReactNode }) {
  const isMobileView = CheckIsMobileView()
  return (
    <div
      className={clsx([
        "container mx-auto",
        isMobileView ? "flex-1 bg-alpha-100" : "pt-1 md:py-8"
      ])}
    >
      {children}
    </div>
  )
}

export default SearchLayout
