import { IconSortDescending2 } from "@tabler/icons-react"
import clsx from "clsx"

import { ProductSortablesEnum } from "@/generated"

import { Button } from "@core/components/ui/button"

interface ProductSortProps {
  sort: ProductSortablesEnum
  onSortChanged: (sort: ProductSortablesEnum) => void
}

const ProductSort = ({ sort, onSortChanged }: ProductSortProps) => {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="flex items-center">
        <IconSortDescending2 className="h-5 w-5 text-gray-400" />
        <span className="font-semibold text-gray-700">مرتب سازی:</span>
      </div>
      <ol className="flex items-center gap-2">
        <li>
          <Button
            noStyle
            className={clsx([
              sort === ProductSortablesEnum.Newest
                ? "font-bold text-brand-500"
                : "text-gray-600"
            ])}
            onClick={() => onSortChanged(ProductSortablesEnum.Newest)}
          >
            جدیدترین
          </Button>
        </li>
        <li>
          <Button
            noStyle
            className={clsx([
              sort === ProductSortablesEnum.MostAffordable
                ? "font-bold text-brand-500"
                : "text-gray-600"
            ])}
            onClick={() => onSortChanged(ProductSortablesEnum.MostAffordable)}
          >
            ارزان‌ترین
          </Button>
        </li>
        <li>
          <Button
            noStyle
            className={clsx([
              sort === ProductSortablesEnum.MostExpensive
                ? "font-bold text-brand-500"
                : "text-gray-600"
            ])}
            onClick={() => onSortChanged(ProductSortablesEnum.MostExpensive)}
          >
            گران‌ترین
          </Button>
        </li>
      </ol>
    </div>
  )
}

export default ProductSort
