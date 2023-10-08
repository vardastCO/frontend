"use client"

import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetAllSellersQuery,
  useGetAllUsersQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"

const AdminInsight = () => {
  const users = useGetAllUsersQuery(graphqlRequestClient)
  const products = useGetAllProductsQuery(graphqlRequestClient)
  const sellers = useGetAllSellersQuery(graphqlRequestClient)
  const brands = useGetAllBrandsQuery(graphqlRequestClient)

  const allCategoriesQuery = useGetAllCategoriesQuery(graphqlRequestClient, {
    indexCategoryInput: {
      vocabularyId: 1
    }
  })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Link href="/admin/products">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-alpha-400">کالاها</div>
          {products.isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 w-full rounded-md bg-alpha-200"></div>
            </div>
          ) : (
            <div className="text-xl font-bold text-alpha-800">
              {digitsEnToFa(addCommas(`${products.data?.products.total}`))}
            </div>
          )}
        </div>
      </Link>
      <Link href="/admin">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-alpha-400">تولید کننده ها</div>
          {brands.isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 w-full rounded-md bg-alpha-200"></div>
            </div>
          ) : (
            <div className="text-xl font-bold text-alpha-800">
              {digitsEnToFa(addCommas(`${brands.data?.brands.total}`))}
            </div>
          )}
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-alpha-400">کاربران</div>
          {users.isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 w-full rounded-md bg-alpha-200"></div>
            </div>
          ) : (
            <div className="text-xl font-bold text-alpha-800">
              {digitsEnToFa(addCommas(`${users.data?.users.total}`))}
            </div>
          )}
        </div>
      </Link>
      <Link href="/admin/sellers">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-alpha-400">فروشندگان</div>
          {sellers.isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 w-full rounded-md bg-alpha-200"></div>
            </div>
          ) : (
            <div className="text-xl font-bold text-alpha-800">
              {digitsEnToFa(addCommas(`${sellers.data?.sellers.total}`))}
            </div>
          )}
        </div>
      </Link>
      <Link href="/admin/vocabularies">
        <div className="card flex flex-col gap-2 rounded p-4">
          <div className="font-bold text-alpha-400">دسته بندی ها</div>
          {allCategoriesQuery.isLoading ? (
            <div className="animate-pulse">
              <div className="h-5 w-full rounded-md bg-alpha-200"></div>
            </div>
          ) : (
            <div className="text-xl font-bold text-alpha-800">
              {digitsEnToFa(
                addCommas(`${allCategoriesQuery.data?.categories.length}`)
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default AdminInsight
