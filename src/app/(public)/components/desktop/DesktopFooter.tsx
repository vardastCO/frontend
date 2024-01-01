import Image from "next/image"

import Link from "@core/components/shared/Link"

import enamad from "@/assets/e-namad.svg"
import logoHorizontal from "@/assets/logo-horizontal-v1-persian-dark-bg.svg"

type Props = {}

export default function DesktopFooter({}: Props) {
  return (
    <footer className="bg-secondary text-alpha-white">
      <div className="container mx-auto flex flex-col gap-y-11">
        <div className="flex flex-col border-b py-11">
          <div className="grid grid-cols-7 gap-x-11">
            <div className="col-span-3 flex flex-col items-center gap-y-9">
              <div className="w-[35%]">
                <Image
                  src={logoHorizontal}
                  alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
                  className="w-full object-contain"
                  priority
                />
              </div>
              <p className="text-justify">
                وردست به عنوان یک دستیار، در واقع یک پلتفرم مارکت پلیس (بازار
                آنلاین) برای فعالیت همه ذینفعان صنعت ساختمان است، که در فاز نخست
                تمرکز آن رفع مشکلات و ارتقای بهره‌وری در زنجیره تأمین مصالح و
                تجهیزات ساختمانی به‌وسیله‌ی ایجاد ابزار خرید و فروش آنلاین برای
                برندها و تأمین کنندگان از یک سو و از سوی دیگر پیمانکاران و
                سازندگان بخش ساختمان می‌باشد، که نهایتاً تجربه‌ی متفاوتی از خرید
                و فروش مصالح و تجهیزات ساختمانی را برای کاربران هر دو سوی این
                پلتفرم رقم خواهد زد.
              </p>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <h3 className="pb">
                با
                <h2 className="inline-block px-1 font-semibold text-primary">
                  وردست
                </h2>
                آشنا شوید
              </h3>
              <Link href="">تماس با وردست</Link>
              <Link href="">درباره وردست</Link>
              <Link href="">قوانین و مقررات</Link>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <h3 className="pb">جدیدترین مطالب</h3>
              <Link href="">نام مطلب اول</Link>
              <Link href="">نام مطلب دوم</Link>
              <Link href="">نام مطلب سوم</Link>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <h3 className="pb">ویژگی های وردست</h3>
              <Link href="">فروشنده شوید!</Link>
              <Link href="">تبلیغات</Link>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <h3 className="pb">با ما همراه شوید</h3>
              <Link href="">نام شبکه اجتماعی</Link>
              <Link href="">نام شبکه اجتماعی</Link>
              <Link href="">نام شبکه اجتماعی</Link>
              <Link href="">نام شبکه اجتماعی</Link>
            </div>
          </div>
          <div className="flex justify-end gap-x-7">
            <div className="h-24 w-24">
              <Image
                src={enamad}
                alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
                className="h-full w-full rounded bg-alpha-white object-contain"
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-9 divide-x-1 pb-11">
          <div>Vardast.com | 2020 - 2023</div>
          <div>
            تمام حقوق اين وب‌سايت نیز برای شرکت خلق ارزش مهستان (وردست) محفوظ
            است.
          </div>
        </div>
      </div>
    </footer>
  )
}
