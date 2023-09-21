import { Metadata } from "next"
import Image from "next/image"

import { _about_items } from "@core/lib/constants"

import logo from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

import IconProvider from "./components/IconProvider"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درباره ما"
  }
}

const AboutPage = async () => {
  return (
    <>
      <div className="mx-auto w-[calc(48%)] pt lg:w-1/2">
        <Image
          src={logo}
          alt="وردست"
          className="w-full shrink-0 object-contain"
        />
      </div>
      <p className="mx-auto">
        نسخه
        <span className="px-2 text-primary">1.15.12</span>
      </p>
      <div className="flex flex-1 flex-col items-center justify-start">
        <p className="text-justify leading-loose">
          وردست به عنوان یک دستیار، در واقع یک پلتفرم مارکت پلیس (بازار آنلاین)
          برای فعالیت همه ذینفعان صنعت ساختمان است، که در فاز نخست تمرکز آن رفع
          مشکلات و ارتقای بهره‌وری در زنجیره تأمین مصالح و تجهیزات ساختمانی
          به‌وسیله‌ی ایجاد ابزار خرید و فروش آنلاین برای تولیدکنندگان و تأمین
          کنندگان از یک سو و از سوی دیگر پیمانکاران و سازندگان بخش ساختمان
          می‌باشد، که نهایتاً تجربه‌ی متفاوتی از خرید و فروش مصالح و تجهیزات
          ساختمانی را برای کاربران هر دو سوی این پلتفرم رقم خواهد زد.
        </p>
        <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-y-8">
          <div className="grid w-full auto-cols-auto grid-cols-4 items-center">
            {_about_items.map((props, index) => (
              <IconProvider key={index} {...props} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <h2>محصولی از شرکت خلق ارزش مهستان</h2>
            <p className="text-xs font-bold text-primary">(وردست)</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
