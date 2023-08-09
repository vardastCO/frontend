"use client"

import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

import {
  useGetAllProductsQuery,
  useGetAllSellersQuery,
  useGetAllUsersQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"

const AdminInsight = () => {
  const { data: users } = useGetAllUsersQuery(graphqlRequestClient)
  const { data: products } = useGetAllProductsQuery(graphqlRequestClient)
  const { data: sellers } = useGetAllSellersQuery(graphqlRequestClient)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Link href="/admin/products">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-gray-400">کالاها</div>
          <div className="text-xl font-bold text-gray-800">
            {digitsEnToFa(addCommas(`${products?.products.total}`))}
          </div>
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-gray-400">کاربران</div>
          <div className="text-xl font-bold text-gray-800">
            {digitsEnToFa(addCommas(`${users?.users.total}`))}
          </div>
        </div>
      </Link>
      <Link href="/admin/sellers">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-gray-400">فروشندگان</div>
          <div className="text-xl font-bold text-gray-800">
            {digitsEnToFa(addCommas(`${sellers?.sellers.total}`))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AdminInsight
