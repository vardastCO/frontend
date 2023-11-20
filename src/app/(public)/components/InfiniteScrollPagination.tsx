"use client"

import { PropsWithChildren, ReactElement, useEffect } from "react"
import { UseInfiniteQueryResult } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"

import NoProductFound from "@/app/(public)/components/no-product-found"

interface IInfiniteScrollPagination<T> {
  infiniteQuery: UseInfiniteQueryResult<T, unknown>
  CardLoader: React.FC<PropsWithChildren>
  // eslint-disable-next-line no-unused-vars
  children(
    _: T,
    // eslint-disable-next-line no-unused-vars
    ref: ((node?: Element | null | undefined) => void) | undefined
  ): ReactElement
}

const InfiniteScrollPagination = <T extends unknown>({
  infiniteQuery,
  CardLoader,
  children
}: IInfiniteScrollPagination<T>) => {
  const { ref, inView } = useInView({ threshold: 0.4 })

  useEffect(() => {
    if (inView) {
      infiniteQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <>
      {infiniteQuery.data?.pages && infiniteQuery.data?.pages.length > 0 ? (
        <>
          {infiniteQuery?.data?.pages.map((page: T) =>
            children(page, infiniteQuery.hasNextPage ? ref : undefined)
          )}
          {infiniteQuery.isFetching &&
            infiniteQuery.isFetchingNextPage &&
            [...Array(3)].map((loader) => <CardLoader key={loader} />)}
        </>
      ) : (
        <NoProductFound />
      )}
    </>
  )
}

export default InfiniteScrollPagination
