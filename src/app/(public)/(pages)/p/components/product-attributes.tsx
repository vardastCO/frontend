import { GroupedAttributes } from "@/app/(public)/(pages)/p/components/product-page"
import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"

type ProductAttributesProps = {
  attributes: GroupedAttributes[]
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <ProductSectionContainer title="ویژگی‌ها">
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
    </ProductSectionContainer>
  )
}

export default ProductAttributes
