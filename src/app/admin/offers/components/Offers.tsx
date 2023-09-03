"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { LucideCheck, LucideX } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import {
  ThreeStateSupervisionStatuses,
  useGetAllOffersQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import NoResult from "@core/components/shared/NoResult"
import PageHeader from "@core/components/shared/PageHeader"
import { Button } from "@core/components/ui/button"
import Pagination from "@/app/admin/components/Pagination"

const Offers = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { isLoading, error, data } = useGetAllOffersQuery(
    graphqlRequestClient,
    {
      indexOfferInput: {
        page: currentPage
      }
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()
  if (!data.offers.data.length) return <NoResult entity="offer" />

  return (
    <>
      <PageHeader title={t("common:offers_index_title")}>
        {session?.abilities.includes("gql.products.offer.store") && (
          <Link href="/admin/offers/new">
            <Button size="medium">
              {t("common:add_entity", { entity: t("common:offer") })}
            </Button>
          </Link>
        )}
      </PageHeader>
      <div className="card table-responsive rounded">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>{t("common:offer")}</th>
              <th>{t("common:price")}</th>
              <th>{t("common:status")}</th>
              <th>{t("common:visibility")}</th>
              <th>{t("common:stock")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.offers.data.map(
              (offer) =>
                offer && (
                  <tr
                    key={offer.id}
                    onClick={() => router.push(`/admin/offers/${offer.id}`)}
                  >
                    <td>
                      <span className="">
                        <span className="block font-bold">
                          {offer.seller.name}
                        </span>
                        <span className="block">{offer.product.name}</span>
                      </span>
                    </td>
                    <td>
                      {offer.lastPublicConsumerPrice ? (
                        <>
                          <span className="font-medium">
                            {digitsEnToFa(
                              addCommas(offer.lastPublicConsumerPrice.amount)
                            )}
                          </span>{" "}
                          <span className="text-xs">تومان</span>
                        </>
                      ) : (
                        "--"
                      )}
                    </td>
                    <td>
                      {offer.status ===
                        ThreeStateSupervisionStatuses.Pending && (
                        <span className="tag tag-light tag-sm tag-warning">
                          {t("common:pending")}
                        </span>
                      )}
                      {offer.status ===
                        ThreeStateSupervisionStatuses.Confirmed && (
                        <span className="tag tag-light tag-sm tag-success">
                          {t("common:confirmed")}
                        </span>
                      )}
                      {offer.status ===
                        ThreeStateSupervisionStatuses.Rejected && (
                        <span className="tag tag-light tag-sm tag-gray">
                          {t("common:rejected")}
                        </span>
                      )}
                    </td>
                    <td>
                      {offer.isPublic ? (
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
                      {offer.isAvailable ? (
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
        total={data.offers.lastPage}
        page={currentPage}
        onChange={(page) => {
          setCurrentPage(page)
        }}
      />
    </>
  )
}

export default Offers
