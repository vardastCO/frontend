import React, { PropsWithChildren } from "react"
import clsx from "clsx"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean | string
  limitWidth?: boolean
  bgWhite?: boolean
  spaceLess?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  limitWidth,
  bgWhite,
  spaceLess,
  children
}) => {
  const isMobileView = CheckIsMobileView()

  if (isMobileView) {
    return (
      <div
        className={
          noStyle === true
            ? ""
            : clsx(
                noStyle,
                limitWidth && !isMobileView ? "max-w-sm" : "w-full",
                bgWhite && "bg-alpha-white",
                spaceLess ? "" : "gap-y px-3.5 py",
                "m-auto flex flex-1 flex-col"
              )
        }
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={clsx(
        limitWidth ? "max-w-sm" : "w-full",
        "m-auto flex h-full w-full flex-1 flex-col gap bg-alpha-white p"
      )}
    >
      {children}
    </div>
  )
}

export default MobileBaseLayout
