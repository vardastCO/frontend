"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { LucideWarehouse } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { useGetAllBrandsQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import Pagination from "@/app/admin/components/Pagination"

const Brands = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllBrandsQuery(
    graphqlRequestClient,
    {
      indexBrandInput: {
        page: currentPage
      }
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.brands.data.length) return <NoResult entity="brand" />

  return (
    <>
      <PageHeader title={t("common:producers")}>
        {session?.abilities.includes("gql.products.brand.store") && (
          <Link href="/admin/brands/new">
            <Button size="medium">
              {t("common:add_entity", { entity: t("common:producer") })}
            </Button>
          </Link>
        )}
      </PageHeader>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th></th>
              <th>{t("common:producer")}</th>
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
                      <div className="relative flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded bg-alpha-50">
                        {brand.logoFile ? (
                          <Image
                            src={brand.logoFile.presignedUrl.url}
                            alt={brand.name}
                            fill
                            className="object-contain"
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
                        {brand.name}
                      </span>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        total={data.brands.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Brands
