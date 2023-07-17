import { useState } from "react"
import { usePagination } from "@mantine/hooks"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"

import { Button } from "@core/components/ui/button"

type ProductPaginationProps = {
  total: number
}

const ProductPagination = ({ total }: ProductPaginationProps) => {
  const [page, onChange] = useState(1)
  const pagination = usePagination({ total, page, onChange })
  return (
    <div className="mt-8 text-center">
      <div
        className="card
        mx-auto
        inline-flex
        items-stretch
        divide-x
        divide-x-reverse
        divide-gray-200
        rounded-md
        text-sm
        [&>button:first-child]:rounded-r-md
        [&>button:last-child]:rounded-l-md"
      >
        <Button
          noStyle
          onClick={() => pagination.previous()}
          className="inline-flex cursor-pointer items-center justify-center bg-white px-3 text-gray-700 hover:bg-gray-50"
        >
          قبلی
        </Button>
        {pagination.range.map((page, idx) => (
          <>
            {typeof page === "number" ? (
              <Button
                noStyle
                onClick={() => pagination.setPage(page)}
                className={clsx([
                  "inline-flex h-12 w-12 cursor-pointer items-center justify-center hover:bg-gray-50",
                  page === pagination.active
                    ? "bg-gray-50 font-bold text-gray-800"
                    : "bg-white"
                ])}
              >
                {digitsEnToFa(page)}
              </Button>
            ) : (
              <span className="inline-flex h-12 w-12 items-center justify-center bg-white">
                ...
              </span>
            )}
          </>
        ))}
        <Button
          noStyle
          onClick={() => pagination.next()}
          className="inline-flex cursor-pointer items-center justify-center bg-white px-3 hover:bg-gray-50"
        >
          بعدی
        </Button>
      </div>
    </div>
  )
}

export default ProductPagination
