import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import NoCountryFound from "@/@core/components/admin/Location/NoCountryFound"
import UserCard from "@/@core/components/admin/User/UserCard"
import Loading from "@/@core/components/shared/Loading/Loading"
import LoadingFailed from "@/@core/components/shared/LoadingFailed/LoadingFailed"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { User, useGetAllUsersQuery } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement, useState } from "react"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string))
    }
  }
}

const UsersIndex: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  const [open, setOpen] = useState(false)

  const { isLoading, error, data } = useGetAllUsersQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.users) return <NoCountryFound />

  return (
    <>
      <PageHeader title={t("users.indexTitle")}></PageHeader>
      <div>
        <div className="flex flex-col gap-2">
          {data?.users?.map((user) => (
            <UserCard key={user.id} user={user as User} />
          ))}
        </div>
      </div>
    </>
  )
}

UsersIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default UsersIndex
