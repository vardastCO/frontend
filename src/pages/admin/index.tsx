import AdminLayout from "@/@core/layouts/AdminLayout"
import { NextPageWithLayout } from "@/pages/_app"
import type { Metadata } from "next"
import { useSession } from "next-auth/react"
import { ReactElement } from "react"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js"
}

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession()
  console.log(session)

  return <></>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Home
