"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  useClickOutside,
  useDebouncedState,
  useLocalStorage
} from "@mantine/hooks"
import clsx from "clsx"
import { LucideSearch, LucideTrash, LucideX } from "lucide-react"

import { useGetSuggestQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"

interface lateatSearchType {
  query: string
  uri: string
}

interface ISearch {
  isMobileView: boolean
}

const Search: React.FC<ISearch> = ({ isMobileView }) => {
  const { push } = useRouter()
  const [latestSearch, SetLatestSearch] = useLocalStorage<lateatSearchType[]>({
    key: "latest-search",
    defaultValue: []
  })
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useDebouncedState<string>("", 500)
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
      enabled: !!query
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

  return (
    <>
      {!isMobileView && (
        <div
          className={clsx([
            "fixed inset-0 z-20 h-full w-full bg-alpha-800 transition duration-200",
            open ? "visible opacity-50" : "invisible opacity-0"
          ])}
        ></div>
      )}

      <div
        className={clsx([
          open ? "z-30" : "",
          "h-full w-full",
          isMobileView && open
            ? "fixed inset-0 mx-auto h-[calc(100%-calc(64px+var(--safe-area-inset-bottom)))] w-full overflow-y-auto"
            : " relative mx-auto md:max-w-md lg:max-w-lg"
        ])}
      >
        {/* <div> */}
        <Button
          onClick={() => setOpen(true)}
          noStyle
          className="flex
                h-full
                w-full
                items-center
                gap-2
                rounded-md
                bg-alpha-200
                px-4
                py-3"
        >
          <LucideSearch className="h-6 w-6 text-primary" />
          <span className="text-alpha-800">جستجو در وردست...</span>
        </Button>
        {/* </div> */}

        {open && (
          <div
            ref={ref}
            className={clsx([
              "card absolute top-0 w-full overscroll-contain px-4 pt-3",
              isMobileView ? "h-full" : "rounded-md"
            ])}
          >
            <div className="flex items-center gap-2 border-b border-alpha-200 pb-3">
              <LucideSearch className="h-6 w-6 text-alpha-400" />
              <Input
                autoFocus
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="جستجو در وردست..."
                className="w-full border-0 bg-transparent focus:outline-none focus-visible:outline-none"
              />
              <Button
                variant="ghost"
                size="small"
                iconOnly
                className="rounded-full"
                onClick={() => setOpen(false)}
              >
                <LucideX className="icon" />
              </Button>
            </div>
            <div className="py-6">
              {!query && latestSearch.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-alpha-700 md:text-base">
                      آخرین جستجوی‌های شما
                    </div>
                    <Button
                      variant="ghost"
                      iconOnly
                      size="small"
                      onClick={() => SetLatestSearch([])}
                    >
                      <LucideTrash className="icon text-alpha-400" />
                    </Button>
                  </div>
                  <ul className="hide-scrollbar flex items-center gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap py-4">
                    {latestSearch.map((item, idx: number) => (
                      <li key={idx}>
                        <a
                          className="inline-flex rounded-lg border border-alpha-200 px-3 py-2 text-sm text-alpha-600 shadow-sm hover:bg-alpha-100 hover:text-alpha-700"
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
                  <div className="flex animate-pulse flex-col gap-3">
                    <div className="h-12 w-[30%] rounded-md bg-alpha-200"></div>
                    <div className="h-5 w-[80%] rounded-md bg-alpha-200"></div>
                    <div className="h-5 w-full rounded-md bg-alpha-200"></div>
                    <div className="h-5 w-[90%] rounded-md bg-alpha-200"></div>
                    <div className="h-5 w-[70%] rounded-md bg-alpha-200"></div>
                  </div>
                )}

              {searchQuery.data && (
                <div className="flex flex-col gap-6 divide-y divide-alpha-200 [&>div:nth-child(n+2)]:pt-4">
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
                              className="flex items-start gap-2 rounded-md border border-alpha-200 p-2"
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
                              <div className="text-sm text-alpha-800">
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
                              className="w-full rounded px-3 py-2 text-start text-alpha-700 hover:bg-alpha-50"
                              onClick={() =>
                                navigateToSearch(
                                  query,
                                  `/search/${suggestedCategory.id}/${suggestedCategory.title}?query=${query}`
                                )
                              }
                              key={suggestedCategory.id}
                            >
                              جستجوی {query} در دسته{" "}
                              <strong className="text-primary-500">
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
                      className="flex w-full items-center gap-2 rounded px-3 py-2 text-start text-alpha-700 hover:bg-alpha-50"
                      onClick={() =>
                        navigateToSearch(query, `/search?query=${query}`)
                      }
                    >
                      <LucideSearch className="h-5 w-5" />
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
