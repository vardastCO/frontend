import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

const ProductCount = () => {
  return (
    <div className="ms-auto text-sm text-gray-600 lg:text-base">
      <span>{digitsEnToFa(addCommas(9239))}</span>
      <span>کالا</span>
    </div>
  )
}

export default ProductCount
