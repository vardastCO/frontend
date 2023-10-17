import { PropsWithChildren } from "react"

const CategoriesLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col border-alpha-200 bg-alpha-100">
      {children}
    </div>
  )
}

export default CategoriesLayout
