import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import PageHeader from "@/@core/components/shared/PageHeader/PageHeader"
import { Avatar } from "@/@core/components/ui/Avatar"
import AdminLayout from "@/@core/layouts/AdminLayout"
import { useGetAllUsersQuery } from "@/generated"
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

  return (
    <>
      <PageHeader title={t("users.indexTitle")}></PageHeader>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>موبایل</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Avatar
                  size="small"
                  src="https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=Convertible"
                  alt="..."
                />
                <span className="ms-2 font-medium text-gray-800">
                  علیرضا سرابچی
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="block h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-50"></span>
                  <span className="font-mono" dir="ltr">
                    a.sarabchi@gmail.com
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="block h-2 w-2 rounded-full bg-red-400 ring-2 ring-red-50"></span>
                  <span className="font-mono" dir="ltr">
                    +98-9124204964
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )

  //   if (isLoading) return <Loading />
  //   if (error) return <LoadingFailed />
  //   if (!data?.users) return <NoCountryFound />

  //   return (
  //     <>
  //       <PageHeader title={t("users.indexTitle")}></PageHeader>
  //       <div>
  //         <div className="flex flex-col gap-2">
  //           {data?.users?.map((user) => (
  //             <UserCard key={user.id} user={user as User} />
  //           ))}
  //         </div>
  //       </div>
  //     </>
  //   )
}

UsersIndex.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default UsersIndex
