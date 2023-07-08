import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

interface ProductCountProps {
  count: number
}

const ProductCount = ({ count }: ProductCountProps) => {
  return (
    <div className="ms-auto text-sm text-gray-600 lg:text-base">
      <span>{digitsEnToFa(addCommas(count))}</span> <span>کالا</span>
    </div>
  )
}

export default ProductCount
