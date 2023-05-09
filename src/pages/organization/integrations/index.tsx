import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
import { ReactElement } from "react"

const OranizationIntegrationsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  return (
    <>
      <NextSeo title={t("Integrations").toString()} />
      <div className="flex h-auto flex-1 flex-col">
        <h1 className="mb-8 text-3xl font-black text-gray-800">
          {t("Integrations")}
        </h1>

        <div></div>
      </div>
    </>
  )
}

OranizationIntegrationsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OranizationIntegrationsPage
