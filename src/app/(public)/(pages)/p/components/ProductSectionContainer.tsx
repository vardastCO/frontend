import { PropsWithChildren } from "react"

const ProductSectionContainer: React.FC<
  PropsWithChildren<{ title: string }>
> = ({ title = "", children }) => {
  return (
    <div className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="">{title}</h4>
      {children}
    </div>
  )
}

export default ProductSectionContainer
