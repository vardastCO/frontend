import ProductEdit from "@/app/admin/products/components/ProductEdit"

const ProductEditPage = ({
  params: { uuid }
}: {
  params: { uuid: number }
}) => {
  return uuid && <ProductEdit id={uuid} />
}

export default ProductEditPage
