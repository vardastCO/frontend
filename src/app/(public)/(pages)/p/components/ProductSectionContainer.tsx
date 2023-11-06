import { PropsWithChildren } from "react"

const ProductSectionContainer: React.FC<
  PropsWithChildren<{ title?: string }>
> = ({ title = "", children }) => {
  return (
    <div className="flex flex-col gap-y bg-alpha-white p py-8">
      {title && <h4 className="pb font-medium">{title}</h4>}
      {children}
    </div>
  )
}

export default ProductSectionContainer
