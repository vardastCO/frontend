"use client"

import { Province } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
import { Switch } from "@core/components/Switch"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { Key, useContext, useState } from "react"
import { LocationsContext } from "./LocationsProvider"

interface ProvinceCardProps {
  countrySlug: string
  province: Province
}

const ProvinceCard = ({ countrySlug, province }: ProvinceCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { name, slug, isActive, citiesCount } = province

  const [active, setActive] = useState(isActive)

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "province",
          entity: province
        })
        setRemoveState(true)
        break
    }
  }

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link
        href={`/admin/locations/country/${countrySlug}/province/${slug}`}
        className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
      >
        {name}
      </Link>
      {citiesCount !== 0 && (
        <span className="text-sm text-gray-500">
          {digitsEnToFa(citiesCount)} شهر
        </span>
      )}
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("common:is_active")}
        </Switch>
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

export default ProvinceCard
