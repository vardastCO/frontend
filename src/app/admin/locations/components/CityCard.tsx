"use client"

import { City } from "@/generated"
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
  provinceSlug: string
  city: City
}

const CityCard = ({ countrySlug, provinceSlug, city }: ProvinceCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setRemoveState = useSetAtom(removeStateAtom)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const { t } = useTranslation()
  const { name, slug, isActive, areasCount } = city

  const [active, setActive] = useState(isActive)

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "city",
          entity: city
        })
        setRemoveState(true)
        break
    }
  }

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link
        href={`/admin/locations/country/${countrySlug}/province/${provinceSlug}/city/${slug}`}
        className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
      >
        {name}
      </Link>
      {areasCount !== 0 && (
        <span className="text-sm text-gray-500">
          {digitsEnToFa(areasCount)} منطقه
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

export default CityCard
