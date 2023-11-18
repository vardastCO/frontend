import { PropsWithChildren } from "react"

const ProductListContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  )
}

export default ProductListContainer
