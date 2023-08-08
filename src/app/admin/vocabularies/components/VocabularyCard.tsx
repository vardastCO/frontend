"use client"

import Link from "next/link"
import {
  LucideEdit,
  LucideFolderClosed,
  LucideMoreVertical,
  LucideTrash
} from "lucide-react"
import { useSession } from "next-auth/react"
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

type VocabularyCardProps = {
  vocabulary: Vocabulary
  onDeleteTriggered: (vocabulary: Vocabulary) => void
}

const VocabularyCard = ({
  vocabulary,
  onDeleteTriggered
}: VocabularyCardProps) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const { slug, title } = vocabulary

  const toggleRemoveItem = () => {
    onDeleteTriggered(vocabulary)
  }

  return (
    <div className="card flex items-center gap-3 rounded px-4 py-2 pe-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/vocabularies/${slug}`}
          className="flex items-center gap-1 font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
        >
          <LucideFolderClosed className="h-6 w-6 text-gray-500 dark:text-gray-700" />
          {title}
        </Link>
      </div>
      <div className="mr-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" iconOnly>
              <LucideMoreVertical className="icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session?.abilities.includes(
              "gql.base.taxonomy.vocabulary.update"
            ) && (
              <DropdownMenuItem>
                <LucideEdit className="dropdown-menu-item-icon" />
                <span>{t("common:edit")}</span>
              </DropdownMenuItem>
            )}
            {session?.abilities.includes(
              "gql.base.taxonomy.vocabulary.destroy"
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
  )
}

export default VocabularyCard
