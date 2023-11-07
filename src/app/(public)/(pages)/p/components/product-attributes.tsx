import { GroupedAttributes } from "@/app/(public)/(pages)/p/components/product-page"
import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"

type ProductAttributesProps = {
  attributes: GroupedAttributes[]
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <ProductSectionContainer title="ویژگی‌ها">
      <ul className="flex list-disc flex-col gap-y pr decoration-primary">
        {attributes.map((attribute, idx) => (
          <li className="" key={idx}>
            <div className="grid grid-cols-5">
              <p className="col-span-2 pl text-secondary">{attribute.name}:</p>
              <p className="col-span-3 text-justify">
                {attribute.values.join(", ")}{" "}
                {attribute.uom && attribute.uom.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </ProductSectionContainer>
  )
}

export default ProductAttributes
