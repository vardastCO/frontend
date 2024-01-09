/* eslint-disable no-unused-vars */
import { ReactElement, useState } from "react"
import clsx from "clsx"

import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"

export enum ProductContainerType {
  PHOTO = "photo",
  LARGE_LIST = "large-list",
  SMALL_LIST = "small-list"
}

interface IProductListContainer {
  type?: ProductContainerType
  children(_: {
    selectedItemId: ICategoryListLoader
    setSelectedItemId: (_?: any) => void
  }): ReactElement
}

const ProductListContainer: React.FC<IProductListContainer> = ({
  type = ProductContainerType.LARGE_LIST,
  children
}) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  return (
    <div
      className={clsx(
        "grid bg-alpha-white",
        type === ProductContainerType.LARGE_LIST
          ? "grid-cols-1 px-6 md:grid-cols-4 lg:grid-cols-5"
          : "grid-cols-2 gap-0.5"
      )}
    >
      {children({ selectedItemId, setSelectedItemId })}
    </div>
  )
}

export default ProductListContainer
