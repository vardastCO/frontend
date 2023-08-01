"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import useTranslation from "next-translate/useTranslation"

import { useGetAllProductsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import Pagination from "@/app/admin/components/Pagination"

const Products = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllProductsQuery(
    graphqlRequestClient,
    {
      indexProductInput: {
        page: currentPage
      }
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.products.data.length) return <NoResult entity="product" />

  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

  return (
    <>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>{t("common:product")}</th>
              <th>{t("common:status")}</th>
              <th>{t("common:updated")}</th>
              <th>{t("common:stock")}</th>
              <th>{t("common:price")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.data.map(
              (product) =>
                product && (
                  <tr
                    key={product.id}
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                  >
                    <td className="w-12">
                      <div className="relative aspect-square h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={
                            product.images.at(0)?.file.presignedUrl
                              .url as string
                          }
                          alt={product.name}
                          sizes="5vw"
                          fill
                        />
                      </div>
                    </td>
                    <td>
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </td>
                    <td>
                      {product.isActive ? (
                        <span className="tag tag-dot tag-sm tag-success">
                          {t("common:active")}
                        </span>
                      ) : (
                        <span className="tag tag-dot tag-sm tag-gray">
                          {t("common:inactive")}
                        </span>
                      )}
                    </td>
                    <td>
                      <span>
                        {digitsEnToFa(
                          formatDistanceToNow(
                            new Date(product.updatedAt).getTime(),
                            {
                              addSuffix: true
                            }
                          )
                        )}
                      </span>
                    </td>
                    <td>
                      <span>--</span>
                    </td>
                    <td>
                      {product.lowestPrice ? (
                        <>
                          <span className="font-medium">
                            {digitsEnToFa(
                              addCommas(`${product.lowestPrice?.amount}`)
                            )}
                          </span>{" "}
                          <span className="text-xs">تومان</span>
                        </>
                      ) : (
                        "--"
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        total={data.products.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Products
