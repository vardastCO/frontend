"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { useGetAllProductsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Link from "@core/components/shared/Link"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import Pagination from "@/app/admin/components/Pagination"

const Products = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
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
      <PageHeader title={t("common:products_index_title")}>
        {session?.abilities.includes("gql.products.product.store") && (
          <Link href="/admin/products/new">
            <Button size="medium">
              {t("common:add_entity", { entity: t("common:product") })}
            </Button>
          </Link>
        )}
      </PageHeader>
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
              <th>{t("common:operation")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.products.data.map(
              (product) =>
                product && (
                  <tr key={product.id}>
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
                      <div className="flex flex-col gap-1.5">
                        <span className="font-medium text-alpha-800">
                          {product.name}
                        </span>
                        {product.sku && (
                          <span className="text-xs text-alpha-600">
                            کد کالا: {product.sku}
                          </span>
                        )}
                      </div>
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
                    <td>
                      <Link
                        target="_blank"
                        href={`/admin/products/${product.id}`}
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
