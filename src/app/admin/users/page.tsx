import PageHeader from "@/@core/components/shared/PageHeader"
import { useGetAllUsersQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Avatar } from "@core/components/ui/Avatar"
import useTranslation from "next-translate/useTranslation"

export default function UsersIndex() {
  const { t } = useTranslation()

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
            <tr onClick={() => console.log("123")}>
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
