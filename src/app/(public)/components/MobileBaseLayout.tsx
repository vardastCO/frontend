import React, { PropsWithChildren } from "react"

const MobileBaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-1 flex-col gap-y p">{children}</div>
}

export default MobileBaseLayout
