import { GroupedAttributes } from "@/app/(public)/(pages)/product/components/product-page"
import ProductSectionContainer from "@/app/(public)/(pages)/product/components/ProductSectionContainer"

type ProductAttributesProps = {
  attributes: GroupedAttributes[]
  title?: string
}

const ProductAttributes = ({
  attributes,
  title = "ویژگی‌ها"
}: ProductAttributesProps) => {
  return (
    <ProductSectionContainer title={title}>
      <ul className="flex list-disc flex-col gap-y pr-6 decoration-primary">
        {attributes.map((attribute, idx) => (
          <li className="" key={idx}>
            <div className="grid grid-cols-5">
              <p className="col-span-2 pl-1 text-secondary">
                {attribute.name}:
              </p>
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
