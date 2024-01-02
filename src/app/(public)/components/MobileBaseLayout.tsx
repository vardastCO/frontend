import React, { PropsWithChildren } from "react"
import clsx from "clsx"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean | string
  limitWidth?: boolean
  bgWhite?: boolean
  spaceLess?: boolean
  fullHeight?: boolean
  extraPadding?: boolean
  background?: boolean
  container?: boolean
  gap?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  limitWidth,
  bgWhite,
  spaceLess,
  container = true,
  extraPadding,
  fullHeight,
  background,
  gap,
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
                limitWidth && !isMobileView ? "max-w-md" : "w-full",
                bgWhite && "bg-alpha-white",
                fullHeight &&
                  "h-full pb-[calc(env(safe-area-inset-bottom)*0.5+10px)]",
                spaceLess ? "" : "gap-y px-3.5 py",
                "m-auto flex flex-1 flex-col",
                gap && "gap-y-1"
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
        "m-auto flex h-full w-full flex-1 flex-col gap p",
        limitWidth ? "max-w-md" : "w-full",
        background && "bg-[url('/images/background.svg')]",
        extraPadding && "py-20"
      )}
    >
      <div className={clsx(container && "container mx-auto")}>{children}</div>
    </div>
  )
}

export default MobileBaseLayout
