import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getProductQueryFn } from "@core/queryFns/productQueryFns"
import ProductPage from "@/app/(public)/(pages)/p/components/product-page"

interface ProductIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: ProductIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug[0] as number
  // const slug = params.slug[1] as string
  const data = await getProductQueryFn(id)

  return {
    title: data.product.title || data.product.name,
    description: data.product.metaDescription,
    alternates: {
      canonical: encodeURI(
        `${process.env.NEXT_PUBLIC_URL}/p/${data.product.id}/${data.product.name}`
      )
    }
  }
}

const ProductIndex = async ({ params: { slug } }: ProductIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const id = slug[0] as number
  // const pSlug = slug[1] as string

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(["product", { id: +id }], () =>
    getProductQueryFn(id)
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductPage id={id} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default ProductIndex
