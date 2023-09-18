import React from "react"

interface IModalHeader {
  title: string
}

const MobileHeader: React.FC<IModalHeader> = ({ title }) => {
  return (
    <div className="sticky top-0 border-b border-alpha-200 p-4">
      <div className="flex justify-center gap-2">
        <div className="font-bold text-alpha-800">{title}</div>
      </div>
    </div>
  )
}

export default MobileHeader
