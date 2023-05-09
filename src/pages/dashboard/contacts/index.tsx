import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { NextSeo } from "next-seo"
import { ReactElement } from "react"

const ContactsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="مخاطبین" />
      <div className="flex flex-1 flex-col">
        <h1 className="mb-8 text-3xl font-black text-gray-800">مخاطبین</h1>
      </div>
    </>
  )
}

ContactsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ContactsPage
