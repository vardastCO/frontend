"use client"

import { useContext, useState } from "react"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import {
  IconDots,
  IconEdit,
  IconFile,
  IconFolderFilled,
  IconGripVertical,
  IconTrash
} from "@tabler/icons-react"
import { useSetAtom } from "jotai"
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

import { VocabulariesContext } from "./VocabulariesProvider"

interface CategoryCardProps {
  vocabularySlug: string
  category: Category
}

const CategoryCard = ({ category, vocabularySlug }: CategoryCardProps) => {
  const { t } = useTranslation()
  const { removeStateAtom, entityToRemoveAtom } =
    useContext(VocabulariesContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { slug, title, isActive, childrenCount, id } = category

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(isActive)
  const hasChildren: boolean = !!category.childrenCount

  const { status, data, error, refetch } = useGetCategoryQuery(
    graphqlRequestClient,
    {
      id
    },
    { enabled: false }
  )

  const toggleChilds = () => {
    const newOpen = !open
    if (newOpen) refetch()
    setOpen(newOpen)
  }

  const toggleRemoveItem = () => {
    setEntityToRemove({
      type: "category",
      entity: category
    })
    setRemoveState(true)
  }

  return (
    <>
      <div className="card flex items-center gap-3 rounded bg-white px-4 py-2 pe-2">
        <div className="flex flex-1 items-center gap-2">
          <IconGripVertical className="hidden h-5 w-5 text-gray-400" />
          <div className="flex h-8 w-8 items-center justify-center">
            {hasChildren && (
              <IconFolderFilled
                className="h-5 w-5 text-gray-400"
                stroke={1.5}
              />
            )}
            {!hasChildren && (
              <IconFile className="h-5 w-5 text-gray-400" stroke={1.5} />
            )}
          </div>
          <Button
            noStyle
            onClick={() => toggleChilds()}
            className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
          >
            {title}
          </Button>
          {hasChildren && (
            <span className="text-sm text-gray-500">
              {digitsEnToFa(childrenCount)} زیر دسته
            </span>
          )}
        </div>
        <div className="mr-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" iconOnly>
                <IconDots className="icon" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IconEdit className="dropdown-menu-item-icon" />
                <span>{t("common:edit")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={toggleRemoveItem}>
                <IconTrash className="dropdown-menu-item-icon" />
                <span>{t("common:delete")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {open && (
        <div className="ms-8 border-s border-gray-200 ps-2">
          <div className="flex flex-col gap-2">
            {data?.category.children.map((child) => (
              <CategoryCard
                category={child as Category}
                vocabularySlug={vocabularySlug}
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
