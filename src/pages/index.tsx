import DashboardLayout from "@/@core/layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { ReactElement } from "react"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div>Index</div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Home
