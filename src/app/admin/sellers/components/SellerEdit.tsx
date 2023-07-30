"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Address, ContactInfo, Seller, useGetSellerQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import PageHeader from "@core/components/shared/PageHeader"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import AddressesTab from "@/app/admin/components/AddressesTab"
import ContactInfosTab from "@/app/admin/components/ContactInfosTab"
import SellerForm from "@/app/admin/sellers/components/SellerForm"

type Props = {
  uuid: string
}

const SellerEdit = ({ uuid }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetSellerQuery(graphqlRequestClient, {
    id: +uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.seller.name}></PageHeader>
      <Tabs defaultValue="information">
        <TabsList>
          <TabsTrigger value="information">
            {t("common:information")}
          </TabsTrigger>
          <TabsTrigger value="addresses">{t("common:addresses")}</TabsTrigger>
          <TabsTrigger value="contactInfos">
            {t("common:contactInfos")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <SellerForm seller={data.seller as Seller} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressesTab
            relatedType="Seller"
            relatedId={data.seller.id}
            addresses={data.seller.addresses as Address[]}
          />
        </TabsContent>
        <TabsContent value="contactInfos">
          <ContactInfosTab
            relatedType="Seller"
            relatedId={data.seller.id}
            contactInfos={data.seller.contacts as ContactInfo[]}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default SellerEdit
