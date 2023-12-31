"use client"

import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { addDays, format } from "date-fns"
import { useSession } from "next-auth/react"
import {
  AggregateOffer,
  BreadcrumbList,
  ItemList,
  Offer as OfferSchema,
  Product as ProductSchema,
  WithContext
} from "schema-dts"

import {
  GetProductQuery,
  Offer,
  Price,
  Product,
  Image as ProductImage,
  Uom
} from "@/generated"

import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import Link from "@core/components/shared/Link"
import { getProductQueryFn } from "@core/queryFns/productQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import ProductAttributes from "@/app/(public)/(pages)/product/components/product-attributes"
import ProductDescription from "@/app/(public)/(pages)/product/components/product-description"
import ProductImages from "@/app/(public)/(pages)/product/components/product-images"
import ProductOffers from "@/app/(public)/(pages)/product/components/product-offers"
import ProductIntroduce from "@/app/(public)/(pages)/product/components/ProductIntroduce"
import SameCategories from "@/app/(public)/(pages)/product/components/SameCategories"
import SuggestedOffer from "@/app/(public)/(pages)/product/components/suggested-offer"

export type GroupedAttributes = {
  name: string
  values: string[]
  uom: Uom
  isRequired: boolean
}

type ProductPageProps = {
  isMobileView: boolean
  id: number
}

const ProductPage = ({ id, isMobileView }: ProductPageProps) => {
  const { data: session } = useSession()
  const { data } = useQuery<GetProductQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.PRODUCT_QUERY_KEY, { id: +id }],
    queryFn: () => getProductQueryFn(id)
  })

  if (!data) notFound()

  const product = data.product

  let groupedAttributes: GroupedAttributes[] = []
  product.attributeValues.forEach((attributeValue) => {
    if (!attributeValue) return
    const attributeId = attributeValue.attribute.id
    const attributeName = attributeValue.attribute.name
    const attributeValueValue = attributeValue.value

    if (groupedAttributes[attributeId]) {
      groupedAttributes[attributeId].values.push(attributeValueValue)
    } else {
      groupedAttributes[attributeId] = {
        name: attributeName,
        values: [attributeValueValue],
        uom: attributeValue.attribute.uom as Uom,
        isRequired: attributeValue.attribute.isRequired
      }
    }
  })
  groupedAttributes = groupedAttributes.filter((n) => n)

  const breadcrumbJsonLdArray = []
  product.category.parentsChain.forEach((parent, idx) => {
    breadcrumbJsonLdArray.push({
      "@type": "ListItem",
      position: idx + 2,
      item: {
        "@id": encodeURI(
          `${process.env.NEXT_PUBLIC_URL}/product/${parent.id}/${parent.title}`
        ),
        name: parent.title
      }
    })
  })

  breadcrumbJsonLdArray.push({
    "@type": "ListItem",
    position: product.category.parentsChain.length + 2,
    item: {
      "@id": encodeURI(
        `${process.env.NEXT_PUBLIC_URL}/products/${product.category.id}/${product.category.title}`
      ),
      name: product.category.title
    }
  })

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": process.env.NEXT_PUBLIC_URL as string,
          name: process.env.NEXT_PUBLIC_TITLE as string
        }
      },
      ...(breadcrumbJsonLdArray as ItemList[]),
      {
        "@type": "ListItem",
        position: breadcrumbJsonLdArray.length + 2,
        item: {
          "@id": encodeURI(
            `${process.env.NEXT_PUBLIC_URL}/products/${product.id}/${product.name}`
          ),
          name: product.name
        }
      }
    ]
  }

  const breadcrumb: CrumbItemProps[] = []
  product.category.parentsChain.forEach((parent) => {
    breadcrumb.push({
      label: parent.title,
      path: `/products/${parent.id}/${parent.title}`,
      isCurrent: false
    })
  })

  breadcrumb.push({
    label: product.category.title,
    path: `/products/${product.category.id}/${product.category.title}`,
    isCurrent: false
  })

  let offersJsonLd = {}
  if (product.publicOffers && product.publicOffers.length > 0) {
    const offersTemp: OfferSchema[] = []
    product.publicOffers.forEach((offer) => {
      offersTemp.push({
        "@type": "Offer",
        price: (offer?.lastPublicConsumerPrice?.amount || 0) * 10,
        priceCurrency: "IRR",
        name: offer?.seller.name,
        priceValidUntil: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        itemCondition: "NewCondition",
        availability: "InStock"
      })
    })
    offersJsonLd = {
      "@type": "AggregateOffer",
      priceCurrency: "IRR",
      lowPrice: (product.lowestPrice?.amount || 0) * 10,
      highPrice: (product.highestPrice?.amount || 0) * 10,
      offerCount: product.publicOffers.length,
      offers: offersTemp
    }
  }
  const productJsonLd: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.at(0)?.file.presignedUrl.url,
    sku: product.sku,
    url: `${process.env.NEXT_PUBLIC_URL}/product/${product.id}/${product.name}`,
    offers: offersJsonLd as AggregateOffer
  }

  return (
    <>
      <div className="border-b bg-alpha-white">
        <Breadcrumb dynamic={false} items={breadcrumb} />
      </div>

      <div
        className="grid grid-cols-1 gap-1 lg:grid-cols-[5fr_7fr]"
        style={{
          paddingBottom:
            typeof window !== "undefined"
              ? document?.getElementById("bottom-navigation-buy-box")
                  ?.clientHeight
              : 0
        }}
      >
        <div className="flex flex-col bg-alpha-white">
          <div className="md:max-w-[200px]">
            {product.images.length > 0 && (
              <ProductImages
                isMobileView={isMobileView}
                images={product.images as ProductImage[]}
                session={session}
                product={product as Product}
              />
            )}
          </div>

          <ProductIntroduce product={product as Product} />
        </div>

        {groupedAttributes.filter((item) => !!item.isRequired).length > 0 && (
          <ProductAttributes
            attributes={
              groupedAttributes.filter(
                (item) => !!item.isRequired
              ) as GroupedAttributes[]
            }
          />
        )}

        {product.publicOffers.length > 0 && (
          <ProductOffers
            uom={product.uom as Uom}
            offers={product.publicOffers as Offer[]}
          />
        )}

        {product.attributeValues.length > 0 && (
          // <ProductDetails
          //   attributes={groupedAttributes as GroupedAttributes[]}
          // />
          <ProductAttributes
            title="مشخصات"
            attributes={groupedAttributes as GroupedAttributes[]}
          />
        )}
        {product.description && (
          <ProductDescription description={product.description} />
        )}
        {isMobileView && product.sameCategory.length > 0 && (
          <SameCategories
            hasExtraItem={{ title: "کالاهای مشابه" }}
            products={product.sameCategory as Product[]}
          />
        )}
      </div>
      {product.lowestPrice && (
        <SuggestedOffer
          offersCount={product.publicOffers.length}
          offer={product.lowestPrice as Price}
          uom={product.uom as Uom}
        />
      )}
      {session?.abilities.includes("gql.products.product.moderated_update") && (
        <Link
          className="btn btn-secondary btn-lg m block"
          href={`/admin/products/${product.id}`}
        >
          ویرایش
        </Link>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  )
}

export default ProductPage
