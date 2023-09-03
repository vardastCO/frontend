"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Address, Brand, ContactInfo, useGetBrandQuery } from "@/generated"

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
import BrandForm from "@/app/admin/brands/components/BrandForm"
import AddressesTab from "@/app/admin/components/AddressesTab"
import ContactInfosTab from "@/app/admin/components/ContactInfosTab"

type Props = {
  uuid: string
}

const BrandEdit = ({ uuid }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetBrandQuery(
    graphqlRequestClient,
    {
      id: +uuid
    },
    {
      staleTime: 1000
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.brand.name}></PageHeader>
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
          <BrandForm brand={data.brand as Brand} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressesTab
            relatedType="Brand"
            relatedId={data.brand.id}
            addresses={data.brand.addresses as Address[]}
          />
        </TabsContent>
        <TabsContent value="contactInfos">
          <ContactInfosTab
            relatedType="Brand"
            relatedId={data.brand.id}
            contactInfos={data.brand.contacts as ContactInfo[]}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default BrandEdit
