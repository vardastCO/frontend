"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { IconBuildingWarehouse, IconMapPin } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import {
  BreadcrumbList,
  ItemList,
  Product as ProductSchema,
  WithContext
} from "schema-dts"

import {
  AttributeValue,
  GetProductQuery,
  Image as ProductImage
} from "@/generated"

import Breadcrumb, { CrumbItemProps } from "@core/components/shared/Breadcrumb"
import { Button } from "@core/components/ui/button"
import { getProductQueryFn } from "@core/queryFns/productQueryFns"
import ProductAttributes from "@/app/(public)/(pages)/p/components/product-attributes"
import ProductImages from "@/app/(public)/(pages)/p/components/product-images"
import ProductSellers from "@/app/(public)/(pages)/p/components/product-sellers"

type ProductPageProps = {
  isMobileView: RegExpMatchArray | null
  id: number
}

const ProductPage = ({ id, isMobileView }: ProductPageProps) => {
  const { data } = useQuery<GetProductQuery>({
    queryKey: ["product", { id: +id }],
    queryFn: () => getProductQueryFn(id)
  })

  const hasDiscount = true
  const price = 48899300

  if (!data) notFound()

  const product = data.product

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

  const productJsonLd: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.at(0)?.file.presignedUrl.url,
    sku: product.sku,
    url: `${process.env.NEXT_PUBLIC_URL}/p/${product.id}/${product.name}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IRR",
      lowPrice: "3890000",
      highPrice: "3890000",
      offerCount: "4",
      offers: [
        {
          "@type": "Offer",
          price: "3890000",
          priceCurrency: "IRR",
          name: "شیر آلات تیرداد",
          priceValidUntil: "2023-7-17",
          itemCondition: "NewCondition",
          availability: "InStock"
        }
      ]
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div>
          <Breadcrumb dynamic={false} items={breadcrumb} />
        </div>
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr]">
          <ProductImages
            isMobileView={isMobileView}
            images={product.images as ProductImage[]}
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-extrabold leading-relaxed text-gray-800">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-500">برند:</span>
              <Link
                className="font-bold text-brand-500"
                href={`/brand/${product.brand.id}/${product.brand.slug}`}
              >
                {product.brand.name}
              </Link>
            </div>

            <div className="mt-8">
              <div className="mb-4 font-bold text-gray-800">ویژگی‌ها</div>
              <ul className="ms-6 list-outside list-disc space-y-2">
                {product.attributeValues.slice(4).map((attribute) => (
                  <li key={attribute?.id}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-500">
                        {attribute?.attribute.name}
                      </span>
                      <span className="font-bold text-gray-700">
                        {attribute?.value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-gray-200 p-4 lg:mt-auto">
              <div className="mb-4 flex items-center gap-2">
                <span className="tag tag-warning tag-light">بهترین قیمت</span>
                <Link
                  href="#sellers"
                  scroll={false}
                  className="mr-auto text-sm font-semibold text-brand-600"
                >
                  +۲ فروشنده دیگر
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="flex items-start gap-2.5 py-3">
                  <IconBuildingWarehouse
                    className="h-8 w-8 text-gray-400"
                    stroke={1.5}
                  />
                  <div className="flex flex-col items-start gap-1.5">
                    <div className="font-bold text-gray-700">فروشگاه عرفان</div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <IconMapPin
                          className="h-4 w-4 text-gray-400"
                          stroke={1.5}
                        />
                        تهران
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">عملکرد</span>
                        <span className="font-bold text-emerald-500">عالی</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-3">
                  <div className="flex flex-col items-start justify-between gap-2 md:flex-row lg:items-center">
                    <span className="font-semibold text-gray-600">
                      قیمت فروشنده
                    </span>
                    <div className="flex flex-col items-stretch justify-between text-gray-800">
                      <div className="flex items-start gap-2">
                        {hasDiscount && (
                          <div className="mt-2 rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white">
                            {digitsEnToFa(15)}%
                          </div>
                        )}
                        <div>
                          <span className="text-xs leading-none text-gray-600">
                            قیمت هر تن
                          </span>
                          <div className="flex items-center gap-1 leading-none">
                            <span className="text-lg font-semibold leading-none">
                              {digitsEnToFa(addCommas(price))}
                            </span>
                            <span className="text-sm leading-none">تومان</span>
                          </div>
                          <div className="mt-2 flex-1">
                            {hasDiscount && (
                              <span className="text-sm text-gray-500 line-through">
                                {digitsEnToFa(addCommas(price))}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mr-auto">
                    <Button size="medium">خرید از فروشگاه عرفان</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductSellers />
        <ProductAttributes
          attributes={product.attributeValues as AttributeValue[]}
        />
      </div>
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
