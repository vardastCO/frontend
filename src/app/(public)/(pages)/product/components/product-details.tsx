import { GroupedAttributes } from "@/app/(public)/(pages)/product/components/product-page"
import ProductSectionContainer from "@/app/(public)/(pages)/product/components/ProductSectionContainer"

type ProductDetailsProps = {
  attributes: GroupedAttributes[]
}

const ProductDetails = ({ attributes }: ProductDetailsProps) => {
  return (
    <ProductSectionContainer title="مشخصات">
      <table className="w-full border-collapse rounded border">
        <tbody className="">
          {attributes.map((attribute, idx) => (
            <tr className="grid grid-cols-5" key={idx}>
              <td className="col-span-2 flex border-spacing-half items-center border bg-alpha-50 p text-secondary">
                {attribute.name}
              </td>

              <td className="col-span-3 flex border-spacing-half items-center border p text-justify">
                {attribute.values.join(", ")}{" "}
                {attribute.uom && attribute.uom.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductSectionContainer>
  )
}

export default ProductDetails
