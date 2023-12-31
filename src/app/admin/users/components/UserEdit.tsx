"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Permission, Role, Session, useGetUserQuery, User } from "@/generated"

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
import UserSessionsTab from "@/app/admin/users/components/UserSessionsTab"

import UserForm from "./UserForm"
import UserPermissionsForm from "./UserPermissionsForm"

type Props = {
  uuid: string
}

const UserEdit = ({ uuid }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetUserQuery(
    graphqlRequestClient,
    {
      uuid
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
      <PageHeader title={data.user.fullName}></PageHeader>
      <Tabs defaultValue="information">
        <TabsList>
          <TabsTrigger value="information">
            {t("common:information")}
          </TabsTrigger>
          <TabsTrigger value="permissions">
            {t("common:permissions")}
          </TabsTrigger>
          <TabsTrigger value="sessions">{t("common:sessions")}</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
          <UserForm user={data.user as User} />
        </TabsContent>
        <TabsContent value="permissions">
          <UserPermissionsForm
            userId={data.user.id}
            userRoles={data.user.roles as Role[]}
            userPermissions={data.user.permissions as Permission[]}
          />
        </TabsContent>
        <TabsContent value="sessions">
          <UserSessionsTab sessions={data.user.sessions as Session[]} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default UserEdit
