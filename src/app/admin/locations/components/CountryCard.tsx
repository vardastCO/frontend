"use client"

import { getFlagEmoji } from "@/@core/utils/getFlagEmoji"
import { Country } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"

import Link from "next/link"
import { useState } from "react"
import { Separator } from "react-aria-components"
import { Item, Menu } from "../../../../@core/components/ui/Menu"
import { Switch } from "../../../../@core/components/ui/Switch"

type CountryCardProps = {
  country: Country
}

const CountryCard = ({ country }: CountryCardProps) => {
  const { name, slug, alphaTwo, isActive, provincesCount } = country
  const [active, setActive] = useState(isActive)

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
          {t("is_active")}
        </Switch>
        <Menu
          onAction={alert}
          buttonProps={{
            intent: "ghost",
            size: "xsmall",
            children: <IconDots className="icon" />,
            iconOnly: true
          }}
        >
          <Item id="edit">
            <IconEdit className="dropdown-menu-item-icon" />
            ویرایش
          </Item>
          <Separator className="dropdown-menu-separator" />
          <Item id="delete" className="dropdown-menu-item-danger">
            <IconTrash className="dropdown-menu-item-icon" />
            حذف
          </Item>
        </Menu>
      </div>
    </div>
  )
}

export default CountryCard
