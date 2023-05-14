"use client"

import { Category } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { IconChevronDown, IconGripVertical } from "@tabler/icons-react"

import Link from "next/link"
import { useState } from "react"
import { Switch } from "../../../../@core/components/ui/Switch"

interface CategoryCardProps {
  vocabularySlug: string
  category: Category
}

const CategoryCard = ({ category, vocabularySlug }: CategoryCardProps) => {
  const { slug, title, isActive, childrenCount } = category

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(isActive)
  const hasChildren: boolean = !!category.childrenCount
  return (
    <div className="card flex items-center rounded bg-white px-2 py-2">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center">
          {hasChildren && (
            <span className="flex h-6 w-6 cursor-pointer items-center justify-center text-gray-400 hover:bg-gray-50">
              <IconChevronDown
                className={`h-4 w-4 ${open ? "rotate-270" : "rotate-90"}`}
              />
            </span>
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
        <div className="mr-auto">
          <div className="flex items-center gap-2">
            <Switch onChange={setActive} isSelected={active} size="small">
              {t("is_active")}
            </Switch>
            <IconGripVertical className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      {/* {hasChildren && (
            <Collapsible.Content>
              <div className="my-2 ms-6 border-0 border-s ps-4">
                <CategoryCard categories={category.children as Category[]} />
              </div>
            </Collapsible.Content>
          )} */}
    </div>
  )
}

export default CategoryCard
