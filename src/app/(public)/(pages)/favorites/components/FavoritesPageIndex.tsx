"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
// import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  Brand,
  EntityTypeEnum,
  GetUserFavoriteBrandsQuery,
  GetUserFavoriteProductsQuery,
  GetUserFavoriteSellersQuery,
  Product,
  Seller
} from "@/generated"

import NotFoundIcon from "@core/components/svg/not-found-icon"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import { allUserFavoriteBrandsQueryFns } from "@core/queryFns/allUserFavoriteBrandsQueryFns"
import { allUserFavoriteProductsQueryFns } from "@core/queryFns/allUserFavoriteProductsQueryFns"
import { allUserFavoriteSellersQueryFns } from "@core/queryFns/allUserFavoriteSellersQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
// import {
//   Brand,
//   GetUserFavoriteBrandQuery,
//   GetUserFavoriteProductQuery,
//   GetUserFavoriteSellerQuery,
//   Product,
//   Seller
// } from "@/generated"

import BrandOrSellerCard, {
  BrandOrSellerCardSkeleton
} from "@/app/(public)/components/BrandOrSellerCard"
import { TabTitleWithExtraData } from "@/app/(public)/components/BrandOrSellerProfile"
// import { allUserFavoriteBrandQueryFns } from "@core/queryFns/allUserFavoriteBrandQueryFns"
// import { allUserFavoriteProductQueryFns } from "@core/queryFns/allUserFavoriteProductQueryFns"
// import { allUserFavoriteSellerQueryFns } from "@core/queryFns/allUserFavoriteSellerQueryFns"
// import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
// import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
// import ProductCard from "@/app/(public)/components/product-card"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import ProductCard, {
  ProductCardSkeleton
} from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

const NotFoundItems = ({ text = "کالا" }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <NotFound text={text} />
      <NotFoundItemsHelp text={text} />
    </div>
  )
}

const NotFound = ({ text = "کالا" }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-7 bg-alpha-white px-6 py-10">
      <NotFoundIcon />
      <p className="text-center text-alpha-500">
        {`شما هنوز ${text} به لیست علاقمندی‌ها اضافه نکرده اید!`}
      </p>
    </div>
  )
}

const NotFoundItemsHelp = ({ text = "کالا" }) => {
  return (
    <div className="grid h-full w-full grid-cols-6 items-center justify-center bg-alpha-white px-6 py-10">
      <div className="col-span-5 flex flex-col justify-evenly gap-y-1">
        <p className="text-right">نشان کنید!</p>
        <p className="text-right text-sm text-alpha-500">
          {`لیست دلخواه خود را بسازید و به راحتی ${text}های مورد نظر خود را پیدا
          کنید.`}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-12 w-12">
          <Image
            src="/favorite-gif.gif"
            alt="favorite-gif"
            fill
            className="object-fill"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  )
}

const FavoritesPageIndex = ({ session }: { session: Session | null }) => {
  const [type, setType] = useState<EntityTypeEnum>(EntityTypeEnum.Product)
  const [cacheFlag, setCacheFlag] = useState(false)

  const productQuery = useQuery<GetUserFavoriteProductsQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_PRODUCT,
      EntityTypeEnum.Product
    ],
    queryFn: () =>
      allUserFavoriteProductsQueryFns({ accessToken: session?.accessToken }),
    refetchOnWindowFocus: true
  })

  const brandQuery = useQuery<GetUserFavoriteBrandsQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_BRAND,
      EntityTypeEnum.Brand
    ],
    queryFn: () =>
      allUserFavoriteBrandsQueryFns({ accessToken: session?.accessToken }),
    refetchOnWindowFocus: true
  })

  const sellerQuery = useQuery<GetUserFavoriteSellersQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_SELLER,
      EntityTypeEnum.Seller
    ],
    queryFn: () =>
      allUserFavoriteSellersQueryFns({ accessToken: session?.accessToken }),
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    if (!cacheFlag) {
      brandQuery.refetch()
      sellerQuery.refetch()
      productQuery.refetch()
      setCacheFlag(true)
    }

    return () => {
      setCacheFlag(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tabs
      onValueChange={(value) => {
        setType(value as EntityTypeEnum)
      }}
      defaultValue="product"
      value={type}
      className="h-full"
    >
      <TabsList className="w-full">
        <TabsTrigger
          className={clsx("w-1/2 bg-alpha-white !pb-2 !pt-4 font-semibold ")}
          value={EntityTypeEnum.Product}
        >
          <TabTitleWithExtraData
            title="کالاها"
            total={productQuery.data?.favorites.product.length}
          />
        </TabsTrigger>
        <TabsTrigger
          className={clsx("w-1/2 bg-alpha-white !pb-2 !pt-4 font-semibold ")}
          value={EntityTypeEnum.Seller}
        >
          <TabTitleWithExtraData
            title="فروشندگان"
            total={sellerQuery.data?.favorites.seller.length}
          />
        </TabsTrigger>
        <TabsTrigger
          className={clsx("w-1/2 bg-alpha-white !pb-2 !pt-4 font-semibold ")}
          value={EntityTypeEnum.Brand}
        >
          <TabTitleWithExtraData
            title="برندها"
            total={brandQuery.data?.favorites.brand.length}
          />
        </TabsTrigger>
      </TabsList>
      <TabsContent value={EntityTypeEnum.Product}>
        {productQuery.isFetching || productQuery.isLoading ? (
          <ProductListContainer>
            {() => (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            )}
          </ProductListContainer>
        ) : productQuery.data?.favorites.product.length ? (
          <ProductListContainer>
            {({ selectedItemId, setSelectedItemId }) => (
              <>
                {productQuery.data?.favorites.product.map(
                  (product) =>
                    product && (
                      <ProductCard
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        key={product.id}
                        product={product as Product}
                      />
                    )
                )}
              </>
            )}
          </ProductListContainer>
        ) : (
          <NotFoundItems text="کالا" />
        )}
      </TabsContent>
      <TabsContent value={EntityTypeEnum.Seller}>
        {sellerQuery.isFetching || sellerQuery.isLoading ? (
          <BrandsOrSellersContainer>
            {() => (
              <>
                <BrandOrSellerCardSkeleton />
                <BrandOrSellerCardSkeleton />
                <BrandOrSellerCardSkeleton />
              </>
            )}
          </BrandsOrSellersContainer>
        ) : sellerQuery.data?.favorites.seller.length ? (
          <BrandsOrSellersContainer>
            {({ selectedItemId, setSelectedItemId }) => (
              <>
                {sellerQuery.data?.favorites.seller.map(
                  (seller) =>
                    seller && (
                      <BrandOrSellerCard
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        key={seller.id}
                        content={{
                          ...(seller as Seller),
                          __typename: "Seller"
                        }}
                      />
                    )
                )}
              </>
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="فروشنده‌" />
        )}
      </TabsContent>
      <TabsContent value={EntityTypeEnum.Brand}>
        {brandQuery.isFetching || brandQuery.isLoading ? (
          <BrandsOrSellersContainer>
            {() => (
              <>
                <BrandOrSellerCardSkeleton />
                <BrandOrSellerCardSkeleton />
                <BrandOrSellerCardSkeleton />
              </>
            )}
          </BrandsOrSellersContainer>
        ) : brandQuery.data?.favorites.brand.length ? (
          <BrandsOrSellersContainer>
            {({ selectedItemId, setSelectedItemId }) => (
              <>
                {brandQuery.data?.favorites.brand.map(
                  (brand) =>
                    brand && (
                      <BrandOrSellerCard
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        key={brand.id}
                        content={{ ...(brand as Brand), __typename: "Brand" }}
                      />
                    )
                )}
              </>
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="برند" />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default FavoritesPageIndex
