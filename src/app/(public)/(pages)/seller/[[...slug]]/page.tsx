import { Metadata, ResolvingMetadata } from "next"
import {
  IconBuildingWarehouse,
  IconInfoSquareRounded,
  IconMapPin
} from "@tabler/icons-react"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@core/components/ui/dialog"
import ProductList from "@/app/(public)/components/product-list"

interface SellerIndexProps {
  params: {
    slug: Array<string | number>
  }
}

export async function generateMetadata(
  { params }: SellerIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug

  return {
    title: slug[1] as string,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/seller/123/asdf`
    }
  }
}

const SellerIndex = async ({ params: { slug } }: SellerIndexProps) => {
  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      <div>
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: false },
            { label: "فروشگاه عرفان", path: "/", isCurrent: true }
          ]}
        />
      </div>
      <div className="mb-12 flex items-end gap-6">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
          <IconBuildingWarehouse
            className="h-10 w-10 text-gray-400"
            stroke={1.5}
          />
          {/* <Image
            src="/images/sellers/kasrataps.png"
            fill
            alt="..."
            className="object-contain p-3"
          /> */}
        </div>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-xl font-bold text-gray-800">فروشگاه عرفان</h1>
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
          <ProductList
            selectedCategoryId={slug && slug.length ? +slug[0] : undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default SellerIndex
