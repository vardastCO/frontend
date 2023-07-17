import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

import { IndexProductInput } from "@/generated"

import ProductList from "@/app/(public)/components/product-list"

interface BrandIndexProps {
  params: {
    slug: Array<string | number>
  }
  searchParams: { [key: string]: string | string[] | undefined }
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

const BrandIndex = async ({
  params: { slug },
  searchParams: { page, query }
}: BrandIndexProps) => {
  const args: IndexProductInput = {}
  args["page"] = page && +page[0] > 0 ? +page[0] : 1
  if (slug && slug.length) args["categoryId"] = +slug[0]
  if (query && query.length) args["query"] = query as string

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
          <ProductList args={args} />
        </div>
      </div>
    </div>
  )
}

export default BrandIndex
