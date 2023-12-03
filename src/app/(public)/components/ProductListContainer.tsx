/* eslint-disable no-unused-vars */
import { PropsWithChildren } from "react"
import clsx from "clsx"

export enum ProductContainerType {
  PHOTO = "photo",
  LARGE_LIST = "large-list",
  SMALL_LIST = "small-list"
}

interface IProductListContainer extends PropsWithChildren {
  type?: ProductContainerType
}

const ProductListContainer: React.FC<IProductListContainer> = ({
  type = ProductContainerType.LARGE_LIST,
  children
}) => {
  return (
    <div
      className={clsx(
        "grid bg-alpha-white",
        type === ProductContainerType.LARGE_LIST
          ? "grid-cols-1  px-6 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-2 gap-0.5"
      )}
    >
      {children}
    </div>
  )
}

export default ProductListContainer
