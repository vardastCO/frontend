"use client"

import { notFound, useRouter } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { useGetAllAttributesQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"

const Attributes = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isLoading, error, data } =
    useGetAllAttributesQuery(graphqlRequestClient)

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.attributes.length) return <NoResult entity="attribute" />

  return (
    <div className="card table-responsive rounded">
      <table className="table-hover table">
        <thead>
          <tr>
            <th>{t("common:attribute")}</th>
            <th>{t("common:id")}</th>
            <th>{t("common:type")}</th>
          </tr>
        </thead>
        <tbody>
          {data?.attributes.map((attribute) => (
            <tr
              key={attribute.id}
              onClick={() => router.push(`/admin/attributes/${attribute.id}`)}
            >
              <td>
                <span className="font-medium text-gray-800">
                  {attribute.name}
                </span>
              </td>
              <td>
                <span className="font-mono">{attribute.slug}</span>
              </td>
              <td>
                <span>{attribute.type}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Attributes
