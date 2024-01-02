import { Metadata } from "next"
import Image from "next/image"
import {
  BuildingStorefrontIcon,
  CubeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  GlobeAsiaAustraliaIcon,
  HomeModernIcon,
  InformationCircleIcon,
  MapIcon,
  PhoneArrowDownLeftIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { _about_items } from "@core/lib/constants"
import withMobileHeader from "@core/middlewares/withMobileHeader"

import logo from "@/assets/logo-horizontal-v1-persian-light-bg.svg"

import IconProvider from "./components/IconProvider"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درباره ما"
  }
}

const AboutPage = async () => {
  const isMobileView = CheckIsMobileView()

  return (
    <>
      {isMobileView && (
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
        </>
      )}
      <div className="flex flex-1 flex-col items-center justify-start gap-y-11 divide-y-0.5 divide-alpha-white">
        <div className="w-full">
          {!isMobileView && (
            <div className="my-7 flex items-center gap-x-4 py">
              <InformationCircleIcon className="h-10 w-10 text-primary" />
              <h1 className="font-bold">درباره ما</h1>
            </div>
          )}
          <p className="text-justify leading-loose">
            وردست به عنوان یک دستیار، در واقع یک پلتفرم مارکت پلیس (بازار
            آنلاین) برای فعالیت همه ذینفعان صنعت ساختمان است، که در فاز نخست
            تمرکز آن رفع مشکلات و ارتقای بهره‌وری در زنجیره تأمین مصالح و
            تجهیزات ساختمانی به‌وسیله‌ی ایجاد ابزار خرید و فروش آنلاین برای
            برندها و تأمین کنندگان از یک سو و از سوی دیگر پیمانکاران و سازندگان
            بخش ساختمان می‌باشد، که نهایتاً تجربه‌ی متفاوتی از خرید و فروش مصالح
            و تجهیزات ساختمانی را برای کاربران هر دو سوی این پلتفرم رقم خواهد
            زد.
          </p>
          {isMobileView && (
            <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-y-8">
              <div className="grid w-full auto-cols-auto grid-cols-4 items-center">
                {_about_items.map((props, index) => (
                  <IconProvider key={index} {...props} />
                ))}
              </div>
            </div>
          )}
        </div>
        {!isMobileView && (
          <>
            <div className=" w-full">
              <div className="my-7 flex items-center gap-x-4 py">
                <QuestionMarkCircleIcon className="h-10 w-10 text-primary" />
                <h2 className="font-bold">چرا وردست؟</h2>
              </div>
              <div className="grid grid-cols-4 gap-7">
                <div className="flex flex-col items-start gap-y rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <CubeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">کالاها</h3>
                  <p>توضیحاتی از دسته بندی ها اینجا نوشته می شود</p>
                </div>
                <div className="flex flex-col items-start gap-y rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <Squares2X2Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">دسته بندی ها</h3>
                  <p>توضیحاتی از دسته بندی ها اینجا نوشته می شود</p>
                </div>
                <div className="flex flex-col items-start gap-y rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <BuildingStorefrontIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">فروشندگان</h3>
                  <p>توضیحاتی از دسته بندی ها اینجا نوشته می شود</p>
                </div>
                <div className="flex flex-col items-start gap-y rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <HomeModernIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">برندها</h3>
                  <p>توضیحاتی از دسته بندی ها اینجا نوشته می شود</p>
                </div>
              </div>
            </div>
            <div className=" w-full">
              <div className="my-7 flex items-center gap-x-4 py">
                <GlobeAsiaAustraliaIcon className="h-10 w-10 text-primary" />
                <h2 className="font-bold">راه‌های ارتباط با وردست</h2>
              </div>
              <div className="grid grid-cols-4 gap-7">
                <div className="flex items-center justify-start gap-x rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <GlobeAltIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">وبسایت</h3>
                </div>
                <div className="flex items-center justify-start gap-x rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <EnvelopeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">ایمیل</h3>
                </div>
                <div className="flex items-center justify-start gap-x rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <PhoneArrowDownLeftIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">تماس با وردست</h3>
                </div>
                <div className="flex items-center justify-start gap-x rounded-xl bg-alpha-white p-7">
                  <div className="flex items-center justify-center rounded bg-primary-50 p">
                    <MapIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">کالاها</h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-2 py-11">
        <h2>محصولی از شرکت خلق ارزش مهستان</h2>
        <p className="text-xs font-bold text-primary">(وردست)</p>
      </div>
    </>
  )
}

export default withMobileHeader(AboutPage, {
  title: "درباره ما"
})
