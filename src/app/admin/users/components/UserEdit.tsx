"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Permission, Role, useGetUserQuery, User } from "@/generated"

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

import UserForm from "./UserForm"
import UserPermissionsForm from "./UserPermissionsForm"

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
      <Tabs defaultValue="information">
        <TabsList>
          <TabsTrigger value="information">
            {t("common:information")}
          </TabsTrigger>
          <TabsTrigger value="permissions">
            {t("common:permissions")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <UserForm user={data.user as User} />
        </TabsContent>
        <TabsContent value="permissions">
          <UserPermissionsForm
            userRoles={data.user.roles as Role[]}
            userPermissions={data.user.permissions as Permission[]}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default UserEdit
