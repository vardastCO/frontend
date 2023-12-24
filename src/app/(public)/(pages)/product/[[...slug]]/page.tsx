import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import { EntityTypeEnum } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import { getProductQueryFn } from "@core/queryFns/productQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import ProductPage from "@/app/(public)/(pages)/product/components/product-page"

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
        `${process.env.NEXT_PUBLIC_URL}/product/${data.product.id}/${data.product.name}`
      )
    }
  }
}

const ProductIndex = async ({ params: { slug } }: ProductIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const session = await getServerSession(authOptions)
  const id = slug[0] as number
  // const pSlug = slug[1] as string

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.PRODUCT_QUERY_KEY, { id: +id }],
    () => getProductQueryFn(id)
  )

  await queryClient.prefetchQuery(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      {
        entityId: +slug[0],
        type: EntityTypeEnum.Product
      }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Product
      })
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductPage id={id} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(ProductIndex, {
  hasFavorite: {},
  hasShare: true,
  hasLogo: true
})
