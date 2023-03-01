import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Messenger } from "@ndpco/messenger";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const MessengerPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col flex-1 h-auto">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">پیام‌رسان</h1>

        <div className="flex flex-1 h-auto overflow-auto">
          <Messenger />
        </div>
      </div>
    </>
  );
};

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MessengerPage;
