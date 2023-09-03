import clsx from "clsx"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"

const ContactPage = async () => {
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
          items={[{ label: "تماس با ما", path: "/contact", isCurrent: false }]}
        />
      </div>

      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-bold">تماس با ما</h1>
        <div className="flex flex-col gap-4">
          <p>
            <span className="block text-sm font-semibold text-gray-600">
              آدرس ایمیل:
            </span>
            <span className="block">info@vardast.com</span>
          </p>
          <p>
            <span className="block text-sm font-semibold text-gray-600">
              تلفن تماس:
            </span>
            <span className="block text-right" dir="ltr">
              (021) 87132500
            </span>
          </p>
          <p>
            <span className="block text-sm font-semibold text-gray-600">
              آدرس:
            </span>
            <span className="block">
              تهران، بلوار کاوه، نبش کوچه اخلاقی غربی، پلاک ۱۲/۱، طبقه ۲، واحد ۴
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
