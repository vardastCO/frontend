"use client"

import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { LucideWarehouse } from "lucide-react"
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
  if (!data.brands.data.length) return <NoResult entity="brand" />

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
          {data?.brands.data.map(
            (brand) =>
              brand && (
                <tr
                  key={brand.id}
                  onClick={() => router.push(`/admin/brands/${brand.id}`)}
                >
                  <td className="w-12">
                    <div className="relative flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded bg-gray-50">
                      {brand.logoFile ? (
                        <Image
                          src={brand.logoFile.presignedUrl.url}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <LucideWarehouse
                          className="h-5 w-5 text-gray-400"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-gray-800">
                      {brand.name}
                    </span>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Brands
