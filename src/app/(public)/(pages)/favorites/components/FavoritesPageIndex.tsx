"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
// import { useQuery } from "@tanstack/react-query"
import { LucidePackageX } from "lucide-react"
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

import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
// import { allUserFavoriteBrandQueryFns } from "@core/queryFns/allUserFavoriteBrandQueryFns"
// import { allUserFavoriteProductQueryFns } from "@core/queryFns/allUserFavoriteProductQueryFns"
// import { allUserFavoriteSellerQueryFns } from "@core/queryFns/allUserFavoriteSellerQueryFns"
// import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
// import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
// import ProductCard from "@/app/(public)/components/product-card"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import ProductCard from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

const NotFoundItems = ({ text = "" }) => {
  return (
    <div className="mx-auto flex h-full max-w-xs flex-col items-center py-8">
      <LucidePackageX className="mb-4 h-10 w-10 text-alpha-400" />
      <p className="mb-2 text-lg font-bold text-alpha-800">{text} یافت نشد</p>
    </div>
  )
}

const FavoritesPageIndex = ({ session }: { session: Session | null }) => {
  const [type, setType] = useState<EntityTypeEnum>(EntityTypeEnum.Product)

  const productQuery = useQuery<GetUserFavoriteProductsQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_PRODUCT],
    queryFn: () =>
      allUserFavoriteProductsQueryFns({ accessToken: session?.accessToken }),
    enabled: type === EntityTypeEnum.Product
  })

  const brandQuery = useQuery<GetUserFavoriteBrandsQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_BRAND],
    queryFn: () =>
      allUserFavoriteBrandsQueryFns({ accessToken: session?.accessToken }),
    enabled: type === EntityTypeEnum.Brand
  })

  const sellerQuery = useQuery<GetUserFavoriteSellersQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_SELLER],
    queryFn: () =>
      allUserFavoriteSellersQueryFns({ accessToken: session?.accessToken }),
    enabled: type === EntityTypeEnum.Seller
  })

  return (
    <Tabs
      onValueChange={(value) => setType(value as EntityTypeEnum)}
      defaultValue="product"
      value={type}
      className="h-full bg-alpha-white"
    >
      <TabsList className="w-full">
        <TabsTrigger
          className="w-1/2 bg-alpha-white"
          value={EntityTypeEnum.Product}
        >
          محصولات
        </TabsTrigger>
        <TabsTrigger
          className="w-1/2 bg-alpha-white"
          value={EntityTypeEnum.Seller}
        >
          فروشندگان
        </TabsTrigger>
        <TabsTrigger
          className="w-1/2 bg-alpha-white"
          value={EntityTypeEnum.Brand}
        >
          برندها
        </TabsTrigger>
      </TabsList>
      <TabsContent value={EntityTypeEnum.Product}>
        {productQuery.data?.favorites.product.length ? (
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
          <NotFoundItems text="محصولی" />
        )}
      </TabsContent>
      <TabsContent value={EntityTypeEnum.Seller}>
        {sellerQuery.data?.favorites.seller ? (
          <BrandsOrSellersContainer>
            {sellerQuery.data?.favorites.seller.map(
              (seller) =>
                seller && (
                  <BrandOrSellerCard
                    key={seller.id}
                    content={{ ...(seller as Seller), __typename: "Seller" }}
                  />
                )
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="فروشنده‌ای" />
        )}
      </TabsContent>
      <TabsContent value={EntityTypeEnum.Brand}>
        {brandQuery.data?.favorites.brand ? (
          <BrandsOrSellersContainer>
            {brandQuery.data?.favorites.brand.map(
              (brand) =>
                brand && (
                  <BrandOrSellerCard
                    key={brand.id}
                    content={{ ...(brand as Brand), __typename: "Brand" }}
                  />
                )
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="برندی" />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default FavoritesPageIndex
