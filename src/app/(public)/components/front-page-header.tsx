"use client"

import Link from "next/link"
import { PopoverArrow } from "@radix-ui/react-popover"
import { LucideChevronDown } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

import { useGetVocabularyQuery } from "@/generated"

import graphqlRequestClientWithoutToken from "@core/clients/graphqlRequestClientWithoutToken"
import slugify from "@core/utils/persian-slugify"
import { Button } from "@core/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"

type Props = {
  session: Session | null
}

const FrontPageHeader = ({ session }: Props) => {
  const categories = useGetVocabularyQuery(graphqlRequestClientWithoutToken, {
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
                  <ol className="flex flex-col divide-y divide-alpha-200">
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
      <div className="mr-auto flex gap-x">
        {session?.profile.roles.some(
          (role) => role?.name === "admin" || role?.name === "seller"
        ) ? (
          <Link href="/admin" className="btn btn-primary">
            {session.profile.roles.some((role) => role?.name === "admin")
              ? "ورود به پنل ادمین"
              : "ورود به پنل فروشنده"}
          </Link>
        ) : (
          !session?.user && (
            <Link href="/auth/signin" className="btn btn-ghost">
              ورود / ثبت‌نام
            </Link>
          )
        )}
        {session?.user && (
          <Button variant={"danger"} onClick={() => signOut()}>
            خروج
          </Button>
        )}
      </div>
    </div>
  )
}

export default FrontPageHeader
