import { PropsWithChildren } from "react"

const MobileHomeSectionContainer: React.FC<
  PropsWithChildren<{ title?: string }>
> = ({ title = "", children }) => {
  return (
    <div className={`flex flex-col gap-y-2`}>
      {title && <h4 className={`p pt-0 font-medium`}>{title}</h4>}
      {children}
    </div>
  )
}

export default MobileHomeSectionContainer
