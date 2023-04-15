import DashboardLayout from "@/@core/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const OranizationAppsPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <NextSeo title={t("Apps")} />
      <div className="flex flex-col flex-1 h-auto">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">
          {t("Apps")}
        </h1>

        <div></div>
      </div>
    </>
  );
};

OranizationAppsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OranizationAppsPage;
