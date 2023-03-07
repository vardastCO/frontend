import DashboardLayout from "@/@core/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import "@ndpco/messenger/dist/style.css";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { ReactElement, Suspense } from "react";

const DynamicMessenger = dynamic(
  () => import("@ndpco/messenger").then((res) => res.Messenger),
  {
    ssr: false,
    suspense: true,
  }
);

const MessengerPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="پیام‌رسان" />
      <div className="flex flex-col flex-1 h-auto overflow-auto">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">پیام‌رسان</h1>

        <div className="flex flex-1 h-auto overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicMessenger />
          </Suspense>
        </div>
      </div>
    </>
  );
};

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MessengerPage;
