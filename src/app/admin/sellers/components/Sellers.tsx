"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { LucideCheck, LucideWarehouse, LucideX } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import {
  ThreeStateSupervisionStatuses,
  useGetAllSellersQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Link from "@core/components/shared/Link"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import Pagination from "@/app/admin/components/Pagination"

const Sellers = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
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
      <PageHeader title={t("common:sellers_index_title")}>
        {session?.abilities.includes("gql.products.seller.store") && (
          <Link href="/admin/sellers/new">
            <Button size="medium">
              {t("common:add_entity", { entity: t("common:seller") })}
            </Button>
          </Link>
        )}
      </PageHeader>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>{t("common:seller")}</th>
              <th>{t("common:status")}</th>
              <th>{t("common:visibility")}</th>
              <th>{t("common:operation")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.sellers.data.map(
              (seller) =>
                seller && (
                  <tr key={seller.id}>
                    <td className="w-12">
                      <div className="relative flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded bg-alpha-50">
                        {seller.logoFile ? (
                          <Image
                            src={seller.logoFile.presignedUrl.url}
                            alt={seller.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <LucideWarehouse
                            className="h-5 w-5 text-alpha-400"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="font-medium text-alpha-800">
                        {seller.name}
                      </span>
                    </td>
                    <td>
                      {seller.status ===
                        ThreeStateSupervisionStatuses.Pending && (
                        <span className="tag tag-light tag-sm tag-warning">
                          {t("common:pending")}
                        </span>
                      )}
                      {seller.status ===
                        ThreeStateSupervisionStatuses.Confirmed && (
                        <span className="tag tag-light tag-sm tag-success">
                          {t("common:confirmed")}
                        </span>
                      )}
                      {seller.status ===
                        ThreeStateSupervisionStatuses.Rejected && (
                        <span className="tag tag-light tag-sm tag-gray">
                          {t("common:rejected")}
                        </span>
                      )}
                    </td>
                    <td>
                      {seller.isPublic ? (
                        <span className="tag tag-light tag-icon tag-success tag-sm h-8 w-8 rounded-full">
                          <LucideCheck className="icon" />
                        </span>
                      ) : (
                        <span className="tag tag-light tag-icon tag-gray tag-sm h-8 w-8 rounded-full">
                          <LucideX className="icon" />
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        target="_blank"
                        href={`/admin/sellers/${seller.id}`}
                      >
                        <Button>ویرایش</Button>
                      </Link>
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
