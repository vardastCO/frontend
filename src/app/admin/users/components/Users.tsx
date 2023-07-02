"use client"

import { useRouter } from "next/navigation"
import clsx from "clsx"
import parsePhoneNumber from "libphonenumber-js"
import useTranslation from "next-translate/useTranslation"

import { useGetAllUsersQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar"

type Props = {}

const Users = (props: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isLoading, error, data } = useGetAllUsersQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data?.users) return <NoResult entity="user" />

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th></th>
            <th>{t("common:email")}</th>
            <th>{t("common:cellphone")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr
              key={user.uuid}
              onClick={() => router.push(`/admin/users/${user.uuid}`)}
            >
              <td>
                <Avatar size="small">
                  <AvatarImage
                    src={`https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=${user.fullName}`}
                    alt={user.fullName}
                  />
                  <AvatarFallback>{user.fullName}</AvatarFallback>
                </Avatar>
                <span className="ms-2 font-medium text-gray-800">
                  {user.fullName}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  {user.email && (
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
                  )}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  {user.cellphone && (
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
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
