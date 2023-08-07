"use client"

import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { LucideCheck, LucideX } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { useGetAllAttributesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import Pagination from "@/app/admin/components/Pagination"

const Attributes = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllAttributesQuery(
    graphqlRequestClient,
    {
      indexAttributeInput: {
        page: currentPage
      }
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.attributes.data.length) return <NoResult entity="attribute" />

  return (
    <>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>{t("common:attribute")}</th>
              <th>{t("common:type")}</th>
              <th>{t("common:filterable")}</th>
              <th>{t("common:visibility")}</th>
              <th>{t("common:required")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.attributes.data.map(
              (attribute) =>
                attribute && (
                  <tr
                    key={attribute.id}
                    onClick={() =>
                      router.push(`/admin/attributes/${attribute.id}`)
                    }
                  >
                    <td>
                      <span className="font-medium text-gray-800">
                        {attribute.name}
                      </span>
                    </td>
                    <td>
                      <span className="tag tag-xs tag-gray tag-light">
                        {attribute.type}
                      </span>
                    </td>
                    <td align="center">
                      {attribute.isFilterable ? (
                        <span className="tag tag-light tag-icon tag-success tag-sm h-8 w-8 rounded-full">
                          <LucideCheck className="icon" />
                        </span>
                      ) : (
                        <span className="tag tag-light tag-icon tag-gray tag-sm h-8 w-8 rounded-full">
                          <LucideX className="icon" />
                        </span>
                      )}
                    </td>
                    <td align="center">
                      {attribute.isPublic ? (
                        <span className="tag tag-light tag-icon tag-success tag-sm h-8 w-8 rounded-full">
                          <LucideCheck className="icon" />
                        </span>
                      ) : (
                        <span className="tag tag-light tag-icon tag-gray tag-sm h-8 w-8 rounded-full">
                          <LucideX className="icon" />
                        </span>
                      )}
                    </td>
                    <td align="center">
                      {attribute.isRequired ? (
                        <span className="tag tag-light tag-icon tag-success tag-sm h-8 w-8 rounded-full">
                          <LucideCheck className="icon" />
                        </span>
                      ) : (
                        <span className="tag tag-light tag-icon tag-gray tag-sm h-8 w-8 rounded-full">
                          <LucideX className="icon" />
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
        total={data.attributes.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Attributes
