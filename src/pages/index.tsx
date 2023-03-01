import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { IconAsterisk } from "@tabler/icons-react";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-col flex-1">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">تنظیمات</h1>

        <div className="border-n-gray-200 p-5 bg-white border rounded shadow-sm">
          <div className="flex gap-6">
            <div className="w-1/3">
              <div className="flex items-center gap-2">
                <IconAsterisk className="text-n-gray-500 w-4 h-4" />
                <span className="text-n-gray-800 font-semibold">کلمه عبور</span>
              </div>
            </div>
            <div className="w-2/3">
              <div className="flex flex-col gap-6">
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="text-n-gray-600 font-semibold">
                    کلمه عبور فعلی
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور فعلی خود را وارد کنید"
                    className="border-n-gray-300 shadow-n-sm focus:outline-none focus:ring focus:ring-n-blue-50 focus:border-n-blue-300 block w-full px-3 py-2 transition-all duration-200 bg-white border rounded"
                  />
                </label>
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="text-n-gray-600 font-semibold">
                    کلمه عبور جدید
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور جدید را وارد کنید"
                    className="border-n-gray-300 shadow-n-xs focus:outline-none focus:ring focus:ring-n-blue-50 focus:border-n-blue-300 block w-full px-3 py-2 transition-all duration-200 bg-white border rounded"
                  />
                </label>
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="text-n-gray-600 font-semibold">
                    تکرار کلمه عبور جدید
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور جدید را مجدد وارد کنید"
                    className="border-n-gray-300 shadow-n-sm focus:outline-none focus:ring focus:ring-n-blue-50 focus:border-n-blue-300 block w-full px-3 py-2 transition-all duration-200 bg-white border rounded"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="btn btn-primary">ذخیره</button>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
