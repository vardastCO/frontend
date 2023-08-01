"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { LucideWarehouse } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { useGetAllSellersQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import Pagination from "@/app/admin/components/Pagination"

const Sellers = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllSellersQuery(
    graphqlRequestClient,
    {
      indexSellerInput: {
        page: currentPage
      }
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.sellers.data.length) return <NoResult entity="seller" />

  return (
    <>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>{t("common:seller")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.sellers.data.map(
              (seller) =>
                seller && (
                  <tr
                    key={seller.id}
                    onClick={() => router.push(`/admin/sellers/${seller.id}`)}
                  >
                    <td className="w-12">
                      <div className="relative flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded bg-gray-50">
                        {seller.logoFile ? (
                          <Image
                            src={seller.logoFile.presignedUrl.url}
                            alt={seller.name}
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
                        {seller.name}
                      </span>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        total={data.sellers.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Sellers
