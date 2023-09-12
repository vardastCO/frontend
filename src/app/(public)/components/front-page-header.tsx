"use client"

import Link from "next/link"
import { PopoverArrow } from "@radix-ui/react-popover"
import { LucideChevronDown } from "lucide-react"

import { useGetVocabularyQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import slugify from "@core/utils/persian-slugify"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"

type Props = {}

const FrontPageHeader = (_: Props) => {
  const categories = useGetVocabularyQuery(graphqlRequestClient, {
    slug: "product_categories"
  })

  return (
    <div className="flex items-center py-12">
      {categories.data && (
        <ol className="flex items-center gap-4">
          {categories.data?.vocabulary.categories.slice(0, 5).map(
            (category) =>
              category && (
                <li key={category.id}>
                  <Link
                    className="whitespace-nowrap"
                    href={`/search/${category.id}/${slugify(category.title)}`}
                  >
                    {category.title}
                  </Link>
                </li>
              )
          )}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1.5">
                  <span>دیگر دسته‌بندی‌ها</span>
                  <LucideChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <div className="card rounded-md px-4">
                  <ol className="flex flex-col divide-y divide-gray-200">
                    {categories.data?.vocabulary.categories.slice(5).map(
                      (category) =>
                        category && (
                          <li key={category.id}>
                            <Link
                              className="inline-block whitespace-nowrap py-3"
                              href={`/search/${category.id}/${slugify(
                                category.title
                              )}`}
                            >
                              {category.title}
                            </Link>
                          </li>
                        )
                    )}
                  </ol>
                </div>
              </PopoverContent>
            </Popover>
          </li>
        </ol>
      )}
      <div className="mr-auto">
        <Link href="/profile/auth/signin" className="btn btn-ghost">
          ورود / ثبت‌نام
        </Link>
      </div>
    </div>
  )
}

export default FrontPageHeader
