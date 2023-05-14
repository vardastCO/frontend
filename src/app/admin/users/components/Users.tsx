"use client"

import { useGetAllUsersQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Avatar } from "@core/components/ui/Avatar"

type Props = {}

const Users = (props: Props) => {
  const { isLoading, error, data } = useGetAllUsersQuery(graphqlRequestClient)
  return (
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
  )
}

export default Users
