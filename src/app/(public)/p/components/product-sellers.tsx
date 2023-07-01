import ProductSellerItem from "./product-seller-item"

type Props = {}

const ProductSellers = (props: Props) => {
  return (
    <div className="border-t-2 border-gray-100 pt-4">
      <h2 className="mb-4 text-lg font-bold text-gray-800">
        فروشندگان این کالا
      </h2>
      <div className="flex flex-col gap-3 even:[&>div]:bg-gray-100">
        <ProductSellerItem />
        <ProductSellerItem />
        <ProductSellerItem />
        <ProductSellerItem />
        <ProductSellerItem />
      </div>
    </div>
  )
}

export default ProductSellers
