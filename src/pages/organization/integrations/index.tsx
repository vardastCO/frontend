import DashboardLayout from "@/@core/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const OranizationIntegrationsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo title={t("Integrations").toString()} />
      <div className="flex flex-col flex-1 h-auto">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">
          {t("Integrations")}
        </h1>

        <div></div>
      </div>
    </>
  );
};

OranizationIntegrationsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OranizationIntegrationsPage;
