"use client"

import { notFound } from "next/navigation"

import { Product, useGetProductQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Loading from "@core/components/shared/Loading"
import LoadingFailed from "@core/components/shared/LoadingFailed"
import ProductForm from "@/app/admin/products/components/ProductForm"

type Props = {
  id: number
}

const ProductEdit = ({ id }: Props) => {
  const { isLoading, error, data } = useGetProductQuery(
    graphqlRequestClient,
    {
      id: +id
    },
    {
      staleTime: 1000
    }
  )

  if (isLoading) return <Loading />
  if (error) return <LoadingFailed />
  if (!data) notFound()

  return <ProductForm product={data.product as Product} />
}

export default ProductEdit
