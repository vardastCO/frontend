import { ReactElement, useState } from "react"
import clsx from "clsx"

import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"

interface IBrandsOrSellersContainer {
  children(_: {
    selectedItemId: ICategoryListLoader
    setSelectedItemId: (_?: any) => void
  }): ReactElement
}

const BrandsOrSellersContainer: React.FC<IBrandsOrSellersContainer> = ({
  children
}) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  return (
    <div
      className={clsx(
        "grid grid-cols-3 gap p pb-5 md:grid-cols-4 lg:grid-cols-5"
      )}
    >
      {children({ selectedItemId, setSelectedItemId })}
    </div>
  )
}

export default BrandsOrSellersContainer
