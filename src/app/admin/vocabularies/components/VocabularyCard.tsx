"use client"

import { Vocabulary } from "@/generated"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
import { IconDots, IconEdit, IconFolder, IconTrash } from "@tabler/icons-react"

import { useSetAtom } from "jotai"
import Link from "next/link"
import { Key, useContext } from "react"
import { VocabulariesContext } from "./VocabulariesProvider"

type VocabularyCardProps = {
  vocabulary: Vocabulary
}

const VocabularyCard = ({ vocabulary }: VocabularyCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } =
    useContext(VocabulariesContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { slug, title } = vocabulary

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "vocabulary",
          entity: vocabulary
        })
        setRemoveState(true)
        break
    }
  }

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2 pe-2">
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/vocabularies/${slug}`}
          className="flex items-center gap-1 font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
        >
          <IconFolder className="h-6 w-6 text-gray-500" />
          {title}
        </Link>
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
  )
}

export default VocabularyCard
