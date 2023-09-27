import React, { PropsWithChildren } from "react"

interface IMobileBaseLayout extends PropsWithChildren {
  noStyle?: boolean
}

const MobileBaseLayout: React.FC<IMobileBaseLayout> = ({
  noStyle,
  children
}) => {
  return (
    <div className={noStyle ? "" : "flex flex-1 flex-col gap-y px-6 py"}>
      {children}
    </div>
  )
}

export default MobileBaseLayout
