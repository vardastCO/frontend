import Image from "next/image"
import clsx from "clsx"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

import logo from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

const AboutPage = async () => {
  const isMobileView = CheckIsMobileView()
  return (
    <div
      className={clsx([
        "container mx-auto px-4",
        isMobileView ? "" : "pt-1 md:py-8"
      ])}
    >
      <div>
        <Breadcrumb
          dynamic={false}
          items={[{ label: "درباره وردست", path: "/about", isCurrent: false }]}
        />
      </div>

      <div className="">
        <div className="flex items-center gap-6 max-sm:flex-col">
          <div className="w-full p-12 lg:w-1/2 lg:p-24">
            <Image src={logo} alt="وردست" className="shrink-0 object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="mb-8 text-2xl font-bold">درباره وردست</h1>
            <p className="text-justify leading-loose">
              وردست به عنوان یک دستیار، در واقع یک پلتفرم مارکت پلیس (بازار
              آنلاین) برای فعالیت همه ذینفعان صنعت ساختمان است، که در فاز نخست
              تمرکز آن رفع مشکلات و ارتقای بهره‌وری در زنجیره تأمین مصالح و
              تجهیزات ساختمانی به‌وسیله‌ی ایجاد ابزار خرید و فروش آنلاین برای
              تولیدکنندگان و تأمین کنندگان از یک سو و از سوی دیگر پیمانکاران و
              سازندگان بخش ساختمان می‌باشد، که نهایتاً تجربه‌ی متفاوتی از خرید و
              فروش مصالح و تجهیزات ساختمانی را برای کاربران هر دو سوی این پلتفرم
              رقم خواهد زد.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
