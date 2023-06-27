import ProductCard from "./product-card"

const products = [
  {
    title: "بلوک سبک معدنی ۱۰",
    image: "1651473308164__1661672512178_431233.jpg",
    price: 6467409
  },
  {
    title: "سیمان پاکتی فارس نو",
    image: "22_1672039453033_431233.jpg",
    price: 7203709
  },
  {
    title: "سیمان پاکتی فارس",
    image: "2_1672039145415_4312_1672644724357_431233.jpg",
    price: 9253309
  },
  {
    title: "سیمان سپاهان فله",
    image: "1687248646691_431616.jpg",
    price: 7752009
  },
  {
    title: "سیمان سفید ۴۰ کیلوگرمی نی ریز",
    image: "1651394793392_431233.png",
    price: 4686909
  },
  {
    title:
      "آزمایشگاه تکنولوژی بتن آزمایش تعیین غلظت خمیر نرمال سیمان هیدرولیکی در قالب فایل word در 12 صفحه",
    image: "5555_1664177146210_431462.jpg",
    price: 6624409
  }
]

const ProductList = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
    </div>
  )
}

export default ProductList
