import { IconSortDescending2 } from "@tabler/icons-react"

import { Button } from "@core/components/ui/button"

const ProductSort = () => {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="flex items-center">
        <IconSortDescending2 className="h-5 w-5 text-gray-400" />
        <span className="font-semibold text-gray-700">مرتب سازی:</span>
      </div>
      <ol className="flex items-center gap-2">
        <li>
          <Button noStyle className="font-bold text-brand-500">
            جدیدترین
          </Button>
        </li>
        <li>
          <Button noStyle className="text-gray-600">
            ارزان‌ترین
          </Button>
        </li>
        <li>
          <Button noStyle className="text-gray-600">
            گران‌ترین
          </Button>
        </li>
      </ol>
    </div>
  )
}

export default ProductSort
