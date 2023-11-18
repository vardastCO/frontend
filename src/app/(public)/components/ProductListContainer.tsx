import { PropsWithChildren } from "react"

const ProductListContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 bg-alpha-white px-6 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}

export default ProductListContainer
