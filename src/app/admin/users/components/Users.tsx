"use client"

import { useState } from "react"
import Link from "next/link"
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
import PageHeader from "@core/components/shared/PageHeader"
import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar"
import { Button } from "@core/components/ui/button"
import Pagination from "@/app/admin/components/Pagination"

type Props = {}

const Users = (_: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllUsersQuery(graphqlRequestClient, {
    indexUserInput: {
      page: currentPage
    }
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.users.data) return <NoResult entity="user" />

  return (
    <>
      <PageHeader title={t("common:users_index_title")}>
        {session?.abilities.includes("gql.users.user.store") && (
          <Link href="/admin/users/new">
            <Button size="medium">
              {t("common:add_entity", { entity: t("common:user") })}
            </Button>
          </Link>
        )}
      </PageHeader>
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
                      <div className="flex items-center gap-2 whitespace-nowrap">
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
                      <div className="flex items-center gap-2 whitespace-nowrap">
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

      <Pagination
        total={data.users.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Users
