import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { IconBuildingWarehouse, IconMapPin } from "@tabler/icons-react"

import { Button } from "@core/components/ui/button"

type Props = {}

const ProductSellerItem = (props: Props) => {
  const hasDiscount = true
  const price = 29183479812
  return (
    <div className="flex items-center rounded-md p-4">
      <div className="flex items-center gap-2.5 py-3">
        <IconBuildingWarehouse className="h-8 w-8 text-gray-400" stroke={1.5} />
        <div className="flex flex-col items-start gap-1.5">
          <div className="font-bold text-gray-700">فروشگاه عرفان</div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1 text-gray-500">
              <IconMapPin className="h-4 w-4 text-gray-400" stroke={1.5} />
              تهران
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-auto flex items-center gap-5">
        <div className="flex flex-col items-stretch justify-between text-gray-800">
          <div className="flex items-start gap-2">
            {hasDiscount && (
              <div className="mt-2 rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white">
                {digitsEnToFa(15)}%
              </div>
            )}
            <div>
              <span className="text-xs leading-none text-gray-600">
                قیمت هر تن
              </span>
              <div className="flex items-center gap-1 leading-none">
                <span className="text-lg font-semibold leading-none">
                  {digitsEnToFa(addCommas(price))}
                </span>
                <span className="text-sm leading-none">تومان</span>
              </div>
              <div className="mt-2 flex-1">
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    {digitsEnToFa(addCommas(price))}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button>خرید از این فروشنده</Button>
      </div>
    </div>
  )
}

export default ProductSellerItem
