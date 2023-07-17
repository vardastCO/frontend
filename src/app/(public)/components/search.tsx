"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  useClickOutside,
  useDebouncedState,
  useLocalStorage
} from "@mantine/hooks"
import { IconLoader2, IconSearch, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"

import { useGetSuggestQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"

interface lateatSearchType {
  query: string
  uri: string
}

const Search = () => {
  const { push } = useRouter()
  const [latestSearch, SetLatestSearch] = useLocalStorage<lateatSearchType[]>({
    key: "latest-search",
    defaultValue: []
  })
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useDebouncedState<string>("", 200)
  const ref = useClickOutside(() => {
    if (open) setOpen(false)
  })

  const searchQuery = useGetSuggestQuery(
    graphqlRequestClient,
    {
      suggestInput: {
        query
      }
    },
    {
      enabled: false
    }
  )

  const navigateToSearch = (query: string, uri: string) => {
    SetLatestSearch((values) => {
      const newSearch = {
        query,
        uri
      }
      const temp = [...values, newSearch]
      return temp
        .filter((n) => n)
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.query === value.query)
        )
    })
    setQuery("")
    setOpen(false)
    push(uri)
  }

  const navigateToProduct = (uri: string) => {
    setQuery("")
    setOpen(false)
    push(uri)
  }

  useEffect(() => {
    if (query) {
      searchQuery.refetch()
    }
  }, [query, searchQuery])

  return (
    <>
      <div
        className={clsx([
          "fixed inset-0 z-20 h-full w-full bg-gray-800 transition duration-200",
          open ? "visible opacity-50" : "invisible opacity-0"
        ])}
      ></div>
      <div className="relative z-30 max-w-sm">
        <div>
          <Button
            onClick={() => setOpen(true)}
            noStyle
            className="flex
            w-full
            items-center
            gap-2
            rounded-md
            bg-gray-100
            px-4
            py-3"
          >
            <IconSearch className="h-6 w-6 text-gray-400" />
            <span className="text-gray-500">جستجو در وردست...</span>
          </Button>
        </div>

        {open && (
          <div
            ref={ref}
            className="card
            absolute
            top-0
            w-full
            rounded-md
            px-4
            pt-3"
          >
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              <IconSearch className="h-6 w-6 text-gray-400" />
              <input
                autoFocus
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="جستجو در وردست..."
                className="w-full border-0 bg-transparent focus:outline-none focus-visible:outline-none"
              />
            </div>
            <div className="py-6">
              {!query && latestSearch.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-700 md:text-base">
                      آخرین جستجوی‌های شما
                    </div>
                    <Button
                      variant="ghost"
                      iconOnly
                      size="small"
                      onClick={() => SetLatestSearch([])}
                    >
                      <IconTrash className="icon text-gray-400" />
                    </Button>
                  </div>
                  <ul className="hide-scrollbar flex items-center gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap py-4">
                    {latestSearch.map((item, idx: number) => (
                      <li key={idx}>
                        <a
                          className="inline-flex rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-700"
                          href={item.uri}
                        >
                          {item.query}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {searchQuery.fetchStatus === "fetching" &&
                searchQuery.status === "loading" && (
                  <div className="flex items-center justify-center">
                    <IconLoader2 className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                )}

              {searchQuery.data && (
                <div className="flex flex-col gap-6 divide-y divide-gray-200 [&>div:nth-child(n+2)]:pt-4">
                  {searchQuery.data.suggest.products.length > 0 && (
                    <div className="hide-scrollbar flex items-center gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                      {searchQuery.data.suggest.products.slice(0, 10).map(
                        (suggestedProduct) =>
                          suggestedProduct && (
                            <Button
                              noStyle
                              onClick={() =>
                                navigateToProduct(
                                  `/p/${suggestedProduct.id}/${suggestedProduct.name}`
                                )
                              }
                              key={suggestedProduct.id}
                              className="flex items-start gap-2 rounded-md border border-gray-200 p-2"
                            >
                              <div className="relative h-14 w-14 rounded-md">
                                <Image
                                  src={
                                    suggestedProduct.images.at(0)?.file
                                      .presignedUrl.url as string
                                  }
                                  alt={suggestedProduct.name}
                                  className="object-contain"
                                  sizes="5vw"
                                  fill
                                />
                              </div>
                              <div className="text-sm text-gray-800">
                                {suggestedProduct.name}
                              </div>
                            </Button>
                          )
                      )}
                    </div>
                  )}
                  {searchQuery.data.suggest.categories.length > 0 && (
                    <div>
                      {searchQuery.data.suggest.categories.slice(0, 3).map(
                        (suggestedCategory) =>
                          suggestedCategory && (
                            <Button
                              noStyle
                              className="w-full rounded px-3 py-2 text-start text-gray-700 hover:bg-gray-50"
                              onClick={() =>
                                navigateToSearch(
                                  query,
                                  `/search/${suggestedCategory.id}/${suggestedCategory.title}?q=${query}`
                                )
                              }
                              key={suggestedCategory.id}
                            >
                              جستجوی {query} در دسته{" "}
                              <strong className="text-brand-500">
                                {suggestedCategory.title}
                              </strong>
                            </Button>
                          )
                      )}
                    </div>
                  )}
                  <div>
                    <Button
                      noStyle
                      className="flex w-full items-center gap-2 rounded px-3 py-2 text-start text-gray-700 hover:bg-gray-50"
                      onClick={() =>
                        navigateToSearch(query, `/search?q=${query}`)
                      }
                    >
                      <IconSearch className="h-5 w-5" />
                      <span>{query}</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
