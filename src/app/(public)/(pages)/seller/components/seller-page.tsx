"use client"

import Image from "next/image"
import { notFound } from "next/navigation"
import {
  IconBuildingWarehouse,
  IconInfoSquareRounded,
  IconMapPin
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import { GetSellerQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@core/components/ui/dialog"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import ProductList from "@/app/(public)/components/product-list"

interface SellerPageProps {
  isMobileView: RegExpMatchArray | null
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerPage = ({ args, slug }: SellerPageProps) => {
  const { data, error } = useQuery<GetSellerQuery>(
    ["seller", { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  if (!data) notFound()

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div>
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: false },
            {
              label: data.seller.name,
              path: `/seller/${data.seller.id}/${data.seller.name}`,
              isCurrent: true
            }
          ]}
        />
      </div>
      <div className="mb-12 flex items-end gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
          {data.seller.logoFile?.presignedUrl.url ? (
            <Image
              src={data.seller.logoFile?.presignedUrl.url}
              fill
              alt={data.seller.name}
              className="object-contain p-3"
            />
          ) : (
            <IconBuildingWarehouse
              className="h-10 w-10 text-gray-400"
              stroke={1.5}
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-xl font-bold text-gray-800">
            {data.seller.name}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-gray-500">
              <IconMapPin className="h-4 w-4 text-gray-400" stroke={1.5} />
              تهران
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div>
          </div>
        </div>
        <div className="mr-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="small">
                <IconInfoSquareRounded className="icon" />
                جزئیات
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>اطلاعات تکمیلی فروشنده</DialogTitle>
              </DialogHeader>
              <div>
                <h3 className="mb-2 font-bold text-gray-800">معرفی فروشنده</h3>
                <div className="leading-relaxed text-gray-700">
                  گروه کسری از سال ۱۳۶۷ فعالیت خود را در زمینه واردات تجهیزات
                  بهداشتی ساختمان آغاز کرد و پس از سالها تلاش و کسب تجربه
                  ارزشمند در این صنعت، اقدام به تاسیس کارخانه شیرآلات بهداشتی
                  کسری در سال ۱۳۸۱ نمود. از همان ابتدای راه، نگرش مشتری‌مداری
                  حاکم بر فعالیتهای گروه، موجب شده تا جلب رضایت مشتریان، بهبود
                  کیفیت محصولات، نوآوری مستمر و خدمات پس از فروش گسترده، جزو
                  مهمترین اصول و ارزش‌های گروه شیرآلات کسری باشد. استانداردهای
                  تولید و کنترل کیفیت گروه کسری، در بالاترین حد ممکن تعیین شده
                  است و کلیه محصولات قبل از خروج از خط تولید، تحت سخت‌ترین
                  آزمایشات قرار می‌گیرند. اخذ گواهینامه ایزو ۹۰۰۱، کسب گواهینامه
                  ملی استاندارد ایران، اخذ استاندارد CE اروپا و حضور قدرتمند در
                  بازارهای داخلی و خارجی، شاهدی بر این مدعی است. گروه کسری از
                  سال ۱۳۶۷ فعالیت خود را در زمینه واردات تجهیزات بهداشتی ساختمان
                  آغاز کرد و پس از سالها تلاش و کسب تجربه ارزشمند در این صنعت،
                  اقدام به تاسیس کارخانه شیرآلات بهداشتی کسری در سال ۱۳۸۱ نمود.
                  از همان ابتدای راه، نگرش مشتری‌مداری حاکم بر فعالیتهای گروه،
                  موجب شده تا جلب رضایت مشتریان، بهبود کیفیت محصولات، نوآوری
                  مستمر و خدمات پس از فروش گسترده، جزو مهمترین اصول و ارزش‌های
                  گروه شیرآلات کسری باشد. استانداردهای تولید و کنترل کیفیت گروه
                  کسری، در بالاترین حد ممکن تعیین شده است و کلیه محصولات قبل از
                  خروج از خط تولید، تحت سخت‌ترین آزمایشات قرار می‌گیرند. اخذ
                  گواهینامه ایزو ۹۰۰۱، کسب گواهینامه ملی استاندارد ایران، اخذ
                  استاندارد CE اروپا و حضور قدرتمند در بازارهای داخلی و خارجی،
                  شاهدی بر این مدعی است. هم اکنون گروه کسری با تولید انواع
                  شیرآلات بهداشتی در بیش از ۱۵۰ طرح، رنگ و مدل مختلف یکی از
                  مطرح‌ترین و خوشنام‌ترین تولیدکنندگان شیرآلات بهداشتی در ایران
                  و خاورمیانه می‌باشد. محصولات تولیدی این شرکت به صورت گسترده در
                  کشورهای عراق، افغانستان، ترکمنستان، سوریه، روسیه و شمال آفریقا
                  عرضه می‌شود. مدیران مجموعه در تلاشند تا این حضور در بازارهای
                  جهانی، روز به روز گسترده‌تر و پایدارتر گردد. واردات انواع
                  ملزومات بهداشتی ساختمان از کشورهای اروپایی نظیر جمهوری چک با
                  برند ALCA و کشورهای آسیایی به ویژه کشور چین، تحت برند MELODY
                  از دیگر فعالیت‌های گروه کسری می‌باشد. لازم به ذکر است گروه
                  کسری از ابتدای سال ۲۰۱۷ اقدام به اخذ نمایندگی انحصاری شرکت
                  معظم شیرآلات (هوآیی) نموده است.
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[4fr_8fr] lg:grid-cols-[3fr_9fr]">
        <div className="hidden md:block"></div>
        <div>
          <ProductList args={args} />
        </div>
      </div>
    </div>
  )
}

export default SellerPage
