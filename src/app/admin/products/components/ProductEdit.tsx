"use client"

import { notFound } from "next/navigation"
import useTranslation from "next-translate/useTranslation"

import { Product, useGetProductQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import ProductForm from "@/app/admin/products/components/ProductForm"

type Props = {
  id: number
}

const ProductEdit = ({ id }: Props) => {
  const { t } = useTranslation()
  const { isLoading, error, data } = useGetProductQuery(graphqlRequestClient, {
    id: +id
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return <ProductForm product={data.product as Product} />
}

export default ProductEdit
