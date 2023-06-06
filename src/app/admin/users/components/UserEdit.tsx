"use client"

import { User, useGetUserQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@core/components/Tabs"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import PageHeader from "@core/components/shared/PageHeader"
import useTranslation from "next-translate/useTranslation"
import { notFound } from "next/navigation"
import UserEditForm from "./UserEditForm"

type Props = {
  uuid: string
}

const UserEdit = ({ uuid }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetUserQuery(graphqlRequestClient, {
    uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.user.fullName}></PageHeader>
      <Tabs>
        <TabList>
          <Tab id="information">{t("common:information")}</Tab>
          <Tab id="permissions">{t("common:permissions")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="information">
            <UserEditForm user={data.user as User} />
          </TabPanel>
          <TabPanel id="permissions"></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default UserEdit
