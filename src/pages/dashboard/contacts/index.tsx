import DashboardLayout from "@/@core/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const ContactsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="مخاطبین" />
      <div className="flex flex-col flex-1">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">مخاطبین</h1>
      </div>
    </>
  );
};

ContactsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ContactsPage;
