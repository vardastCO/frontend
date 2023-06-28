import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

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
      {typeof slug[1]}
      <div className="grid grid-cols-[3fr_6fr_3fr]">
        <div className="relative h-96">
          <Image
            src="/images/products/1651394793392_431233.png"
            alt="..."
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-800">
            آزمایشگاه تکنولوژی بتن آزمایش تعیین غلظت خمیر نرمال سیمان هیدرولیکی
            در قالب فایل word در 12 صفحه
          </h1>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductIndex
