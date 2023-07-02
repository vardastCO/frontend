import type { Metadata } from "next"

import ProductForm from "./components/ProductForm"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js"
}

const ProductCreatePage = () => {
  return <ProductForm />
}

export default ProductCreatePage
