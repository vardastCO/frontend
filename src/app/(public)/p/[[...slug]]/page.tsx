import { Metadata, ResolvingMetadata } from "next"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { IconBuildingWarehouse, IconMapPin } from "@tabler/icons-react"

import { Button } from "@core/components/ui/button"

import ProductAttributes from "../components/product-attributes"
import ProductImages from "../components/product-images"
import ProductSellers from "../components/product-sellers"

interface ProductIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: ProductIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  return {
    title: slug[1] as string,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/p/123/asdf`
    }
  }
}

const ProductIndex = async ({ params: { slug } }: ProductIndexProps) => {
  const hasDiscount = true
  const price = 48899300
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="">وردست</a>
          </li>
          <li>
            <a href="">ابزار آلات و تجهیزات</a>
          </li>
          <li>
            <a href="">یراق آلات، لوازم و مصالح ساختمانی</a>
          </li>
          <li>
            <a href="">تجهیزات ساختمانی</a>
          </li>
          <li>
            <a href="">شیرآلات</a>
          </li>
        </ol>
      </div>
      <div className="mb-12 grid grid-cols-[5fr_7fr] gap-6">
        <ProductImages />
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold text-gray-800">
            آزمایشگاه تکنولوژی بتن آزمایش تعیین غلظت خمیر نرمال سیمان هیدرولیکی
            در قالب فایل word در 12 صفحه
          </h1>

          <div className="mt-auto rounded-md border border-gray-200 p-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="tag tag-warning tag-light">بهترین قیمت</span>
              <a href="#" className="text-sm font-semibold text-brand-600">
                +۲ فروشنده دیگر
              </a>
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
                <div className="flex items-center justify-between gap-2">
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

      <ProductAttributes />
    </div>
  )
}

export default ProductIndex
