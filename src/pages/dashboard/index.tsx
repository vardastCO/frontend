import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { IconAsterisk } from "@tabler/icons-react"
import { ReactElement } from "react"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <h1 className="mb-8 text-3xl font-black text-gray-800">تنظیمات</h1>

        <div className="rounded border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex gap-6">
            <div className="w-1/3">
              <div className="flex items-center gap-2">
                <IconAsterisk className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-800">کلمه عبور</span>
              </div>
            </div>
            <div className="w-2/3">
              <div className="flex flex-col gap-6">
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-600">
                    کلمه عبور فعلی
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور فعلی خود را وارد کنید"
                    className="block w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all duration-200 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-50"
                  />
                </label>
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-600">
                    کلمه عبور جدید
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور جدید را وارد کنید"
                    className="shadow-xs block w-full rounded border border-gray-300 bg-white px-3 py-2 transition-all duration-200 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-50"
                  />
                </label>
                <label htmlFor="" className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-600">
                    تکرار کلمه عبور جدید
                  </span>
                  <input
                    type="password"
                    placeholder="کلمه عبور جدید را مجدد وارد کنید"
                    className="block w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm transition-all duration-200 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-50"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="btn btn-primary">ذخیره</button>
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Home
