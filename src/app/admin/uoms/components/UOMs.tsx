"use client"

import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { useGetAllUoMsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import Pagination from "@/app/admin/components/Pagination"

const UOMs = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllUoMsQuery(graphqlRequestClient, {
    indexUomInput: {
      // TODO: remove
      isActive: true,
      page: currentPage
    }
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.uoms.data.length) return <NoResult entity="uom" />

  return (
    <>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>{t("common:symbol")}</th>
              <th>{t("common:status")}</th>
            </tr>
          </thead>
          <tbody>
            {data.uoms.data.map(
              (uom) =>
                uom && (
                  <tr
                    key={uom.id}
                    onClick={() => router.push(`/admin/uoms/${uom.id}`)}
                  >
                    <td>
                      <span className="font-medium text-gray-800">
                        {uom.name}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium text-gray-800">
                        {uom.symbol}
                      </span>
                    </td>
                    <td>
                      {uom.isActive ? (
                        <span className="tag tag-dot tag-success tag-sm">
                          {t("common:active")}
                        </span>
                      ) : (
                        <span className="tag tag-dot tag-gray tag-sm">
                          {t("common:inactive")}
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
        total={data.uoms.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default UOMs
