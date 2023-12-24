"use client"

import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import { EntityTypeEnum, GetIsFavoriteQuery, Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import Link from "@core/components/shared/Link"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import ProductSectionContainer from "@/app/(public)/(pages)/product/components/ProductSectionContainer"
import FavoriteIcon from "@/app/(public)/components/FavoriteIcon"
import Rating from "@/app/(public)/components/Rating"
import ShareIcon from "@/app/(public)/components/ShareIcon"

interface IProductIntroduce {
  product: Product
  session: Session | null
}

const ProductIntroduce = ({ product, session }: IProductIntroduce) => {
  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      { entityId: product.id, type: EntityTypeEnum.Product }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: product.id,
        type: EntityTypeEnum.Product
      }),
    {
      keepPreviousData: true
    }
  )

  return (
    <ProductSectionContainer>
      <div className="flex justify-end gap-x">
        <FavoriteIcon
          entityId={product.id}
          isFavoriteQuery={isFavoriteQuery}
          type={EntityTypeEnum.Product}
        />
        <ShareIcon name={product.name} />
      </div>
      <h3 className="font-semibold">{product.name}</h3>

      <Link
        className=""
        href={`/brand/${product.brand.id}/${slugify(product.brand.name)}`}
        prefetch={false}
      >
        <span className="text-alpha-500">برند:</span>
        <span className="px-2 text-info">{product.brand.name}</span>
      </Link>
      <div className="flex">
        {product.rating && product.rating > 0 ? (
          <Rating rating={product.rating} />
        ) : (
          ""
        )}
      </div>
    </ProductSectionContainer>
  )
}

export default ProductIntroduce
