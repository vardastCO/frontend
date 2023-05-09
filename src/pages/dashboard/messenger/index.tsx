import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import "@ndpco/messenger/dist/style.css"
import { NextSeo } from "next-seo"
import dynamic from "next/dynamic"
import { ReactElement, Suspense } from "react"

const DynamicMessenger = dynamic(
  () => import("@ndpco/messenger").then((res) => res.Messenger),
  {
    ssr: false,
    suspense: true
  }
)

const MessengerPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="پیام‌رسان" />
      <div className="flex h-auto flex-1 flex-col overflow-auto">
        <h1 className="mb-8 text-3xl font-black text-gray-800">پیام‌رسان</h1>

        <div className="flex h-auto flex-1 overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicMessenger />
          </Suspense>
        </div>
      </div>
    </>
  )
}

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default MessengerPage
