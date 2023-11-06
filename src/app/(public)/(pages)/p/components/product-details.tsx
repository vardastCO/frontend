import { GroupedAttributes } from "@/app/(public)/(pages)/p/components/product-page"

type ProductDetailsProps = {
  attributes: GroupedAttributes[]
}

const ProductDetails = ({ attributes }: ProductDetailsProps) => {
  return (
    <div id="attributes" className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="py">مشخصات</h4>
      <table className="border-collapse rounded border">
        <tbody>
          {attributes.map((attribute, idx) => (
            <tr className="grid grid-cols-5" key={idx}>
              <td className="col-span-2 flex border-spacing-half items-center border bg-alpha-100 p text-justify">
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
    </div>
  )
}

export default ProductDetails
