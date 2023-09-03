import { GroupedAttributes } from "@/app/(public)/(pages)/p/components/product-page"

type ProductAttributesProps = {
  attributes: GroupedAttributes[]
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <div
      id="attributes"
      className="divide-y
        divide-gray-200
        [&>div]:grid
        [&>div]:grid-cols-1
        [&>div]:gap-2
        [&>div]:py-3
        md:[&>div]:grid-cols-[3fr_9fr]
        md:[&>div]:gap-4"
    >
      {attributes.map((attribute, idx) => (
        <div key={idx}>
          <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
            {attribute.name}
          </span>
          <span className="inline-block">
            {attribute.values.join(", ")} {attribute.uom && attribute.uom.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ProductAttributes
