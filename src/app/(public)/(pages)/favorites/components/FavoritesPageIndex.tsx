"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { LucidePackageX } from "lucide-react"
import { Session } from "next-auth"

import {
  Brand,
  GetUserFavoriteBrandQuery,
  GetUserFavoriteProductQuery,
  GetUserFavoriteSellerQuery,
  Product,
  Seller
} from "@/generated"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import { allUserFavoriteBrandQueryFns } from "@core/queryFns/allUserFavoriteBrandQueryFns"
import { allUserFavoriteProductQueryFns } from "@core/queryFns/allUserFavoriteProductQueryFns"
import { allUserFavoriteSellerQueryFns } from "@core/queryFns/allUserFavoriteSellerQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerCard from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import ProductCard from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

type TabType = "brand" | "seller" | "product"

const NotFoundItems = ({ text = "" }) => {
  return (
    <div className="mx-auto flex h-full max-w-xs flex-col items-center py-8">
      <LucidePackageX className="mb-4 h-10 w-10 text-alpha-400" />
      <p className="mb-2 text-lg font-bold text-alpha-800">{text} یافت نشد</p>
    </div>
  )
}

const FavoritesPageIndex = ({ session }: { session: Session | null }) => {
  const [type, setType] = useState<TabType>("product")

  const productQuery = useQuery<GetUserFavoriteProductQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_PRODUCT],
    queryFn: () => allUserFavoriteProductQueryFns(session?.accessToken),
    enabled: type === "product"
  })

  const brandQuery = useQuery<GetUserFavoriteBrandQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_BRAND],
    queryFn: () => allUserFavoriteBrandQueryFns(session?.accessToken),
    enabled: type === "brand"
  })

  const sellerQuery = useQuery<GetUserFavoriteSellerQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_SELLER],
    queryFn: () => allUserFavoriteSellerQueryFns(session?.accessToken),
    enabled: type === "seller"
  })

  return (
    <Tabs
      onValueChange={(value) => setType(value as TabType)}
      defaultValue="product"
      value={type}
      className="h-full bg-alpha-white"
    >
      <TabsList className="w-full">
        <TabsTrigger className="w-1/2 bg-alpha-white" value="product">
          محصولات
        </TabsTrigger>
        <TabsTrigger className="w-1/2 bg-alpha-white" value="seller">
          فروشندگان
        </TabsTrigger>
        <TabsTrigger className="w-1/2 bg-alpha-white" value="brand">
          تولیدکنندگان
        </TabsTrigger>
      </TabsList>
      <TabsContent value="product">
        {false ? (
          <ProductListContainer>
            {productQuery.data?.favoriteUser.map(
              ({ product, id }) =>
                product && <ProductCard key={id} product={product as Product} />
            )}
          </ProductListContainer>
        ) : (
          <NotFoundItems text="محصولی" />
        )}
      </TabsContent>
      <TabsContent value="seller">
        {false ? (
          <BrandsOrSellersContainer>
            {sellerQuery.data?.favoriteUser.map(
              ({ seller, id }) =>
                seller && (
                  <BrandOrSellerCard
                    key={id}
                    content={{ ...(seller as Seller), __typename: "Seller" }}
                  />
                )
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="فروشنده‌ای" />
        )}
      </TabsContent>
      <TabsContent value="brand">
        {false ? (
          <BrandsOrSellersContainer>
            {brandQuery.data?.favoriteUser.map(
              ({ brand, id }) =>
                brand && (
                  <BrandOrSellerCard
                    key={id}
                    content={{ ...(brand as Brand), __typename: "Brand" }}
                  />
                )
            )}
          </BrandsOrSellersContainer>
        ) : (
          <NotFoundItems text="تولید کننده‌ای" />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default FavoritesPageIndex
