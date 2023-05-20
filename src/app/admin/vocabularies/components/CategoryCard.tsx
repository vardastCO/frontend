"use client"

import { Category } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import {
  IconFile,
  IconFolderFilled,
  IconGripVertical
} from "@tabler/icons-react"

import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"

interface CategoryCardProps {
  vocabularySlug: string
  category: Category
}

const CategoryCard = ({ category, vocabularySlug }: CategoryCardProps) => {
  const { t } = useTranslation()
  const { slug, title, isActive, childrenCount, id } = category

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(isActive)
  const hasChildren: boolean = !!category.childrenCount

  const toggleChilds = () => {
    const newOpen = !open
    setOpen(newOpen)
  }

  return (
    <>
      <div className="card flex items-center rounded bg-white px-4 py-4">
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
      </div>
      {open && (
        <div className="ms-8 border-s border-gray-200 ps-2">asdfasdf</div>
      )}
    </>
  )
}

export default CategoryCard
