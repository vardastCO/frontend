"use client"

import { Category } from "@/generated"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
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
import Link from "next/link"
import { Key, useContext, useState } from "react"
import { VocabulariesContext } from "./VocabulariesProvider"

interface CategoryCardProps {
  vocabularySlug: string
  category: Category
}

const CategoryCard = ({ category, vocabularySlug }: CategoryCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } =
    useContext(VocabulariesContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { slug, title, isActive, childrenCount, id } = category

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(isActive)
  const hasChildren: boolean = !!category.childrenCount

  const toggleChilds = () => {
    const newOpen = !open
    setOpen(newOpen)
  }

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "category",
          entity: category
        })
        setRemoveState(true)
        break
    }
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
          <Link
            href={`admin/vocabularies/${vocabularySlug}/category/${slug}`}
            className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
          >
            {title}
          </Link>
          {hasChildren && (
            <span className="text-sm text-gray-500">
              {digitsEnToFa(childrenCount)} زیر دسته
            </span>
          )}
        </div>
        <div className="mr-auto flex items-center gap-2">
          <MenuTrigger>
            <Button intent="ghost" iconOnly>
              <IconDots className="icon" />
            </Button>
            <Popover>
              <Menu onAction={onAction}>
                <Item id="edit">
                  <IconEdit className="dropdown-menu-item-icon" />
                  ویرایش
                </Item>
                <Separator />
                <Item id="remove" className="danger">
                  <IconTrash className="dropdown-menu-item-icon" />
                  حذف
                </Item>
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      </div>
      {open && (
        <div className="ms-8 border-s border-gray-200 ps-2">asdfasdf</div>
      )}
    </>
  )
}

export default CategoryCard
