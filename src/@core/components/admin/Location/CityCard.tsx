import { City } from "@/generated"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "../../ui/Switch"

interface ProvinceCardProps {
  countrySlug: string
  provinceSlug: string
  city: City
}

const CityCard = ({ countrySlug, provinceSlug, city }: ProvinceCardProps) => {
  const { name, slug, isActive } = city
  const { t } = useTranslation("common")
  const [active, setActive] = useState(isActive)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link
        href={`/admin/locations/country/${countrySlug}/province/${provinceSlug}/city/${slug}`}
        className="font-bold text-n-gray-800 underline-offset-2 hover:text-n-gray-900 hover:underline"
      >
        {name}
      </Link>
      {/* {areasCount !== 0 && (
        <span className="text-sm text-n-gray-500">
          {digitsEnToFa(areasCount)} استان
        </span>
      )} */}
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default CityCard
