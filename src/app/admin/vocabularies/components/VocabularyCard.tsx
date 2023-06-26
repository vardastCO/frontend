"use client"

import { useContext } from "react"
import Link from "next/link"
import { IconDots, IconEdit, IconFolder, IconTrash } from "@tabler/icons-react"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"

import { Vocabulary } from "@/generated"

import { Button } from "@core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@core/components/ui/dropdown-menu"

import { VocabulariesContext } from "./VocabulariesProvider"

type VocabularyCardProps = {
  vocabulary: Vocabulary
}

const VocabularyCard = ({ vocabulary }: VocabularyCardProps) => {
  const { t } = useTranslation()
  const { removeStateAtom, entityToRemoveAtom } =
    useContext(VocabulariesContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { slug, title } = vocabulary

  const toggleRemoveItem = () => {
    setEntityToRemove({
      type: "vocabulary",
      entity: vocabulary
    })
    setRemoveState(true)
  }

  return (
    <div className="card flex items-center gap-3 rounded px-4 py-2 pe-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/vocabularies/${slug}`}
          className="flex items-center gap-1 font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
        >
          <IconFolder className="h-6 w-6 text-gray-500 dark:text-gray-700" />
          {title}
        </Link>
      </div>
      <div className="mr-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
            <DropdownMenuItem onSelect={toggleRemoveItem} className="danger">
              <IconTrash className="dropdown-menu-item-icon" />
              <span>{t("common:delete")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default VocabularyCard
