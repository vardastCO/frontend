import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { ReactElement } from "react"

const OranizationSettingsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  return (
    <>
      <NextSeo title={t("Organization Settings").toString()} />
      <div className="flex h-auto flex-1 flex-col">
        <h1 className="mb-8 text-3xl font-black text-gray-800">
          {t("Organization Settings")}
        </h1>

        <div>
          <div className="flex gap-6">
            <div className="w-1/3">
              <strong className="block font-bold text-gray-800">
                تنظیمات عمومی سازمان
              </strong>
            </div>
            <div className="2/3 flex-1">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="org_name"
                    className="text-sm font-medium text-gray-500"
                  >
                    نام سازمان
                  </label>
                  <input
                    type="text"
                    name="org_name"
                    id="org_name"
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="org_url"
                    className="text-sm font-medium text-gray-500"
                  >
                    آدرس سازمان
                  </label>
                  <div className="input-group" dir="ltr">
                    <div className="input-addon">https://</div>
                    <input
                      type="url"
                      name="org_url"
                      id="org_url"
                      className="input-field"
                    />
                    <div className="input-addon">.bonyadvokala.com</div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="org_country"
                    className="text-sm font-medium text-gray-500"
                  >
                    کشور
                  </label>
                  <select
                    name="org_country"
                    id="org_country"
                    className="input-field"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="ir">ایران</option>
                    <option value="am">Armenia</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="org_locale"
                    className="text-sm font-medium text-gray-500"
                  >
                    زبان
                  </label>
                  <select
                    name="org_locale"
                    id="org_locale"
                    className="input-field"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="fa">فارسی</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

OranizationSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OranizationSettingsPage
