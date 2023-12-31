"use client"

import { useState } from "react"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import {
  LucideEdit,
  LucideFile,
  LucideFolderClosed,
  LucideGripVertical,
  LucideMoreVertical,
  LucideTrash
} from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

import { Category, useGetCategoryQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@core/components/ui/dropdown-menu"
import { IGetCategoryQueryResult } from "@/app/admin/vocabularies/components/Categories"

interface CategoryCardProps {
  vocabularySlug: string
  category: Category
  onDeleteTriggered: (_: Category) => void
  onEditTriggered: (_: Category) => void
  onEditAttributes: (_: Category) => void
  setGetCategoryQueryResult: (_: IGetCategoryQueryResult) => void
}

const CategoryCard = ({
  category,
  vocabularySlug,
  onDeleteTriggered,
  onEditTriggered,
  onEditAttributes,
  setGetCategoryQueryResult
}: CategoryCardProps) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const { title, childrenCount, productsCount, id } = category

  const [open, setOpen] = useState(false)

  const getCategoryQuery = useGetCategoryQuery(
    graphqlRequestClient,
    {
      id
    },
    { enabled: false }
  )

  const toggleChilds = () => {
    const newOpen = !open
    if (newOpen) {
      getCategoryQuery.refetch()
      setGetCategoryQueryResult(getCategoryQuery)
    } else {
      setGetCategoryQueryResult(null)
    }
    setOpen(newOpen)
  }

  const toggleRemoveItem = () => {
    onDeleteTriggered(category)
  }

  const toggleEditItem = () => {
    onEditTriggered(category)
  }

  const toggleEditAttributeItem = () => {
    onEditAttributes(category)
  }

  return (
    <>
      <div className="card flex items-center gap-3 rounded px-4 py-2 pe-2">
        <div className="flex flex-1 items-center gap-2">
          <LucideGripVertical className="hidden h-5 w-5 text-alpha-400" />
          <div className="flex h-8 w-8 items-center justify-center">
            {!!childrenCount ? (
              <LucideFolderClosed
                className="h-5 w-5 text-alpha-500 dark:text-alpha-700"
                strokeWidth={1.5}
              />
            ) : (
              <LucideFile
                className="h-5 w-5 text-alpha-500 dark:text-alpha-700"
                strokeWidth={1.5}
              />
            )}
          </div>
          <Button
            noStyle
            onClick={() => (!!childrenCount ? toggleChilds() : null)}
            className="font-bold text-alpha-800 underline-offset-2 hover:text-alpha-900 hover:underline dark:text-alpha-400 dark:hover:text-alpha-300"
          >
            {title}
          </Button>
          {!!childrenCount && (
            <span className="text-sm text-alpha-500 dark:text-alpha-600">
              {digitsEnToFa(childrenCount)} زیر دسته
            </span>
          )}
          {productsCount > 0 && (
            <span className="text-sm text-alpha-500 dark:text-alpha-600">
              {digitsEnToFa(productsCount)} کالا
            </span>
          )}
        </div>
        <div className="mr-auto flex items-center gap-2">
          <Button onClick={toggleEditAttributeItem} size={"small"}>
            ویرایش مشخصه ها
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" iconOnly>
                <LucideMoreVertical className="icon" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {session?.abilities.includes(
                "gql.base.taxonomy.category.update"
              ) && (
                <DropdownMenuItem onSelect={toggleEditItem}>
                  <LucideEdit className="dropdown-menu-item-icon" />
                  <span>{t("common:edit")}</span>
                </DropdownMenuItem>
              )}
              {session?.abilities.includes(
                "gql.base.taxonomy.category.destroy"
              ) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={toggleRemoveItem}
                    className="danger"
                  >
                    <LucideTrash className="dropdown-menu-item-icon" />
                    <span>{t("common:delete")}</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {open && (
        <div className="ms-8 border-s border-alpha-200 ps-2">
          <div className="flex flex-col gap-2">
            {getCategoryQuery.data?.category.children.map((child) => (
              <CategoryCard
                category={child as Category}
                setGetCategoryQueryResult={setGetCategoryQueryResult}
                vocabularySlug={vocabularySlug}
                onEditTriggered={(category) => {
                  onEditTriggered(category)
                }}
                onEditAttributes={(category) => {
                  onEditAttributes(category)
                }}
                onDeleteTriggered={(category) => {
                  onDeleteTriggered(category)
                }}
                key={child?.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryCard
