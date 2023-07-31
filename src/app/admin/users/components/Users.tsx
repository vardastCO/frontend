"use client"

import { useRouter } from "next/navigation"
import clsx from "clsx"
import parsePhoneNumber from "libphonenumber-js"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { useGetAllUsersQuery, UserStatusesEnum } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar"

type Props = {}

const Users = (props: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const { isLoading, error, data } = useGetAllUsersQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.users.data) return <NoResult entity="user" />

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th></th>
            <th>{t("common:email")}</th>
            <th>{t("common:cellphone")}</th>
            <th>{t("common:status")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.data.map(
            (user) =>
              user && (
                <tr
                  key={user.uuid}
                  onClick={() => router.push(`/admin/users/${user.uuid}`)}
                >
                  <td>
                    <Avatar size="small">
                      {user.avatarFile && (
                        <AvatarImage
                          src={user.avatarFile.presignedUrl.url}
                          alt={user.fullName}
                        />
                      )}

                      <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="ms-2 font-medium text-gray-800">
                      {user.fullName}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {user.email ? (
                        <>
                          <span
                            className={clsx(
                              "block h-2 w-2 rounded-full ring-2",
                              user.isEmailVerified
                                ? "bg-emerald-400 ring-emerald-50"
                                : "bg-red-400 ring-red-50"
                            )}
                          ></span>
                          <span className="font-mono" dir="ltr">
                            {user.email}
                          </span>
                        </>
                      ) : (
                        "--"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {user.cellphone ? (
                        <>
                          <span
                            className={clsx(
                              "block h-2 w-2 rounded-full ring-2",
                              user.isCellphoneVerified
                                ? "bg-emerald-400 ring-emerald-50"
                                : "bg-red-400 ring-red-50"
                            )}
                          ></span>
                          <span className="font-mono" dir="ltr">
                            {parsePhoneNumber(
                              `+${user.country.phonePrefix}${user.cellphone}`
                            )?.formatInternational()}
                          </span>
                        </>
                      ) : (
                        "--"
                      )}
                    </div>
                  </td>
                  <td>
                    {user.status === UserStatusesEnum.Active && (
                      <span className="tag tag-light tag-sm tag-success">
                        {t("common:active")}
                      </span>
                    )}
                    {user.status === UserStatusesEnum.Banned && (
                      <span className="tag tag-light tag-sm tag-danger">
                        {t("common:banned")}
                      </span>
                    )}
                    {user.status === UserStatusesEnum.NotActivated && (
                      <span className="tag tag-light tag-sm tag-gray">
                        {t("common:not_active")}
                      </span>
                    )}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
