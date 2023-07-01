import { Metadata, ResolvingMetadata } from "next"

import ProductAttributes from "../components/product-attributes"
import ProductImages from "../components/product-images"

interface ProductIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: ProductIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  return {
    title: slug[1] as string,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/p/123/asdf`
    }
  }
}

const ProductIndex = async ({ params: { slug } }: ProductIndexProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 grid grid-cols-[5fr_7fr] gap-6">
        <ProductImages />
        <div>
          <h1 className="text-xl font-extrabold text-gray-800">
            آزمایشگاه تکنولوژی بتن آزمایش تعیین غلظت خمیر نرمال سیمان هیدرولیکی
            در قالب فایل word در 12 صفحه
          </h1>
        </div>
      </div>

      <ProductAttributes />
    </div>
  )
}

export default ProductIndex
