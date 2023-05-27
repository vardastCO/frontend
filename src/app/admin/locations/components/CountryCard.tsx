"use client"

import { Country } from "@/generated"
import { getFlagEmoji } from "@core/utils/getFlagEmoji"
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

type CountryCardProps = {
  country: Country
}

const CountryCard = ({ country }: CountryCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { name, slug, alphaTwo, isActive, provincesCount } = country
  const [active, setActive] = useState(isActive)

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "country",
          entity: country
        })
        setRemoveState(true)
        break
    }
  }

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2 pe-2">
      <div className="flex items-center gap-2">
        <span className="align-baseline text-2xl leading-none">
          {getFlagEmoji(alphaTwo)}
        </span>
        <Link
          href={`/admin/locations/country/${slug}`}
          className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
        >
          {name}
        </Link>
        {provincesCount !== 0 && (
          <span className="text-sm text-gray-500">
            {digitsEnToFa(provincesCount)} استان
          </span>
        )}
      </div>
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

export default CountryCard
