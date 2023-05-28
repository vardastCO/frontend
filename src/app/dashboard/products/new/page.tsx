import type { Metadata } from "next"
import ProductForm from "./components/ProductForm"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js"
}

const ProductCreatePage = () => {
  //   const { data: session } = useSession()
  //   console.log(session)

  return <ProductForm />
}

export default ProductCreatePage
