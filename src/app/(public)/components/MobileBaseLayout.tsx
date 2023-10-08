import React, { PropsWithChildren } from "react"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean
  limitWidth?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  limitWidth,
  children
}) => {
  const isMobileView = CheckIsMobileView()

  return (
    <div
      className={
        noStyle
          ? ""
          : `${
              limitWidth && !isMobileView ? "max-w-sm" : "w-full"
            } m-auto flex flex-1 flex-col gap-y px-3.5 py`
      }
    >
      {children}
    </div>
  )
}

export default MobileBaseLayout
