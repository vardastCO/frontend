import { Area } from "@/generated"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "../../ui/Switch"

interface AreaCardProps {
  countrySlug?: string
  provinceSlug?: string
  citySlug?: string
  area: Area
}

const AreaCard = ({ area }: AreaCardProps) => {
  const { name, slug, isActive } = area
  const { t } = useTranslation("common")
  const [active, setActive] = useState(isActive)
  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <span>{name}</span>
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default AreaCard
