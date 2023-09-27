"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { addDays, format } from "date-fns"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
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
  Image as ProductImage,
  Uom
} from "@/generated"

import slugify from "@core/utils/persian-slugify"
import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import { getProductQueryFn } from "@core/queryFns/productQueryFns"
import ProductAttributes from "@/app/(public)/(pages)/p/components/product-attributes"
import ProductImages from "@/app/(public)/(pages)/p/components/product-images"
import ProductOffers from "@/app/(public)/(pages)/p/components/product-offers"
import SuggestedOffer from "@/app/(public)/(pages)/p/components/suggested-offer"

export type GroupedAttributes = {
  name: string
  values: string[]
  uom: Uom
}

type ProductPageProps = {
  isMobileView: boolean
  id: number
}

const ProductPage = ({ id, isMobileView }: ProductPageProps) => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { data } = useQuery<GetProductQuery>({
    queryKey: ["product", { id: +id }],
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
        uom: attributeValue.attribute.uom as Uom
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
          `${process.env.NEXT_PUBLIC_URL}/search/${parent.id}/${parent.title}`
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
        `${process.env.NEXT_PUBLIC_URL}/search/${product.category.id}/${product.category.title}`
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
            `${process.env.NEXT_PUBLIC_URL}/p/${product.id}/${product.name}`
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
      path: `/search/${parent.id}/${parent.title}`,
      isCurrent: false
    })
  })

  breadcrumb.push({
    label: product.category.title,
    path: `/search/${product.category.id}/${product.category.title}`,
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
    url: `${process.env.NEXT_PUBLIC_URL}/p/${product.id}/${product.name}`,
    offers: offersJsonLd as AggregateOffer
  }

  return (
    <>
      <div>
        <Breadcrumb dynamic={false} items={breadcrumb} />
      </div>
      {session?.abilities.includes("gql.products.product.moderated_update") && (
        <div>
          <Link
            className="btn btn-secondary btn-sm"
            href={`/admin/products/${product.id}`}
          >
            ویرایش
          </Link>
        </div>
      )}
      <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr]">
        {product.images.length > 0 && (
          <ProductImages
            isMobileView={isMobileView}
            images={product.images as ProductImage[]}
          />
        )}

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-extrabold leading-relaxed text-alpha-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-alpha-500">
              {t("common:producer")}:
            </span>
            <Link
              className="font-bold text-primary-500"
              href={`/brand/${product.brand.id}/${slugify(product.brand.name)}`}
              prefetch={false}
            >
              {product.brand.name}
            </Link>
          </div>

          {groupedAttributes.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 font-bold text-alpha-800">ویژگی‌ها</div>
              <ul className="ms-6 list-outside list-disc space-y-2">
                {groupedAttributes.slice(0, 3).map((attribute, idx) => (
                  <li key={idx}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-alpha-500">
                        {attribute.name}
                      </span>
                      <span className="font-bold text-alpha-700">
                        {attribute.values.join(", ")}{" "}
                        {attribute.uom && attribute.uom.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {groupedAttributes.length > 3 && (
                <Link
                  className="mt-2 inline-block text-primary-500"
                  href="#attributes"
                  prefetch={false}
                >
                  + دیگر ویژگی‌ها
                </Link>
              )}
            </div>
          )}

          {product.lowestPrice && (
            <SuggestedOffer
              offersCount={product.publicOffers.length}
              offer={product.lowestPrice as Price}
              uom={product.uom as Uom}
            />
          )}
        </div>
      </div>
      {product.publicOffers.length > 0 && (
        <ProductOffers
          uom={product.uom as Uom}
          offers={product.publicOffers as Offer[]}
        />
      )}
      {product.attributeValues.length > 0 && (
        <ProductAttributes
          attributes={groupedAttributes as GroupedAttributes[]}
        />
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
