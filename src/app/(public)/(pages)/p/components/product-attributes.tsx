import { GroupedAttributes } from "@/app/(public)/(pages)/p/components/product-page"

type ProductAttributesProps = {
  attributes: GroupedAttributes[]
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <div id="attributes" className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="py">ویژگی‌ها</h4>
      <ul className="flex list-disc flex-col gap-y">
        {attributes.map((attribute, idx) => (
          <li className="flex gap-x" key={idx}>
            <p className="text-alpha">{attribute.name}:</p>
            <p className="">
              {attribute.values.join(", ")}{" "}
              {attribute.uom && attribute.uom.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductAttributes
