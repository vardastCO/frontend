"use client"

import { User, useGetUserQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import PageHeader from "@core/components/shared/PageHeader"
import { notFound } from "next/navigation"
import UserEditForm from "./UserEditForm"

type Props = {
  uuid: string
}

const UserEdit = ({ uuid }: Props) => {
  const { isLoading, error, data } = useGetUserQuery(graphqlRequestClient, {
    uuid
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return (
    <>
      <PageHeader title={data.user.fullName}></PageHeader>
      <UserEditForm user={data.user as User} />
    </>
  )
}

export default UserEdit
