import React, { PropsWithChildren } from "react"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean
  limitWidth?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  limitWidth,
  children
}) => {
  return (
    <div
      className={
        noStyle
          ? ""
          : `${
              limitWidth ? "max-w-sm" : ""
            } m-auto flex flex-1 flex-col gap-y px-3.5 py`
      }
    >
      {children}
    </div>
  )
}

export default MobileBaseLayout
