"use client"

import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { useGetAllBrandsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"

const Brands = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isLoading, error, data } = useGetAllBrandsQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.brands.length) return <NoResult entity="brand" />

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th></th>
            <th>{t("common:brand")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.brands.map((brand) => (
            <tr
              key={brand.id}
              onClick={() => router.push(`/admin/users/${brand.id}`)}
            >
              <td>
                <div className="relative aspect-square h-12 w-12 overflow-hidden rounded">
                  <Image
                    src={`https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=${brand.name}`}
                    alt="..."
                    fill
                  />
                </div>
              </td>
              <td>
                <span className="font-medium text-gray-800">{brand.name}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Brands
