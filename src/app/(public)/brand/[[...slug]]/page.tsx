import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

import ProductCount from "@/app/(public)/components/product-count"
import ProductList from "@/app/(public)/components/product-list"
import ProductSort from "@/app/(public)/components/product-sort"

interface BrandIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: BrandIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  return {
    title: slug[1] as string,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/seller/123/asdf`
    }
  }
}

const BrandIndex = async ({ params: { slug } }: BrandIndexProps) => {
  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div className="mb-12 flex items-end gap-6">
        <div className="relative h-28 w-28 rounded-md border border-gray-200">
          <Image
            src="/images/sellers/kasrataps.png"
            fill
            alt="..."
            className="object-contain p-3"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-bold text-gray-800">شیرآلات کسری</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            کالاهای ثبت شده با این برند
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        <div className="hidden md:block"></div>
        <div>
          <div className="flex items-center border-b border-gray-200 py-3">
            <ProductSort />
            <ProductCount />
          </div>
          <div>
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandIndex
