"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Brand, useGetBrandQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import BrandForm from "@/app/admin/brands/components/BrandForm"

type Props = {
  uuid: string
}

const BrandEdit = ({ uuid }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetBrandQuery(graphqlRequestClient, {
    id: +uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <Tabs defaultValue="information">
      <TabsList>
        <TabsTrigger value="information">{t("common:information")}</TabsTrigger>
        <TabsTrigger value="permissions">{t("common:addresses")}</TabsTrigger>
        <TabsTrigger value="permissions">
          {t("common:contactInfos")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="information">
        <BrandForm brand={data.brand as Brand} />
      </TabsContent>
    </Tabs>
  )
}

export default BrandEdit
