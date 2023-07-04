import { AttributeValue } from "@/generated"

type ProductAttributesProps = {
  attributes: AttributeValue[]
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <div
      className="divide-y
        divide-gray-200
        [&>div]:grid
        [&>div]:grid-cols-1
        [&>div]:gap-2
        [&>div]:py-3
        md:[&>div]:grid-cols-[3fr_9fr]
        md:[&>div]:gap-4"
    >
      {attributes.map((attribute) => (
        <div key={attribute.id}>
          <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
            {attribute.attribute.name}
          </span>
          <span className="inline-block">
            {attribute.value}{" "}
            {attribute.attribute.uom && attribute.attribute.uom?.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ProductAttributes
