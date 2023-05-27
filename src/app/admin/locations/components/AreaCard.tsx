"use client"

import { Area } from "@/generated"

import { Switch } from "@core/components/Switch"
import { useAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { useContext, useState } from "react"
import { LocationsContext } from "./LocationsProvider"

interface AreaCardProps {
  countrySlug?: string
  provinceSlug?: string
  citySlug?: string
  area: Area
}

const AreaCard = ({ area }: AreaCardProps) => {
  const { removeStateAtom } = useContext(LocationsContext)
  const [removeState, setRemoveState] = useAtom(removeStateAtom)
  const { t } = useTranslation()
  const { name, slug, isActive } = area

  const [active, setActive] = useState(isActive)
  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <span>{name}</span>
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("common:is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default AreaCard
