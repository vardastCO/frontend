import React, { PropsWithChildren } from "react"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  children
}) => {
  const isMobileView = CheckIsMobileView()

  return (
    <div
      className={`${isMobileView ? "" : "m-auto max-w-xs"} ${
        noStyle ? "" : "flex flex-1 flex-col gap-y px-3.5 py"
      }`}
    >
      {children}
    </div>
  )
}

export default MobileBaseLayout
