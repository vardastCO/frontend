"use client"

import { Area } from "@/generated"

import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
import { Switch } from "@core/components/Switch"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { Key, useContext, useState } from "react"
import { LocationsContext } from "./LocationsProvider"

interface AreaCardProps {
  countrySlug?: string
  provinceSlug?: string
  citySlug?: string
  area: Area
}

const AreaCard = ({ area }: AreaCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { name, slug, isActive } = area

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "area",
          entity: area
        })
        setRemoveState(true)
        break
    }
  }

  const [active, setActive] = useState(isActive)
  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <span>{name}</span>
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("common:is_active")}
        </Switch>{" "}
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

export default AreaCard
