import { Province } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "../../ui/Switch"

interface ILocationProvinceCard {
  countrySlug: string
  province: Province
}

const LocationProvinceCard = ({
  countrySlug,
  province
}: ILocationProvinceCard) => {
  const { name, slug, isActive, citiesCount } = province
  const { t } = useTranslation("common")
  const [active, setActive] = useState(isActive)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link
        href={`/admin/locations/country/${countrySlug}/province/${slug}`}
        className="font-bold text-n-gray-800 underline-offset-2 hover:text-n-gray-900 hover:underline"
      >
        {name}
      </Link>
      {citiesCount !== 0 && (
        <span className="text-sm text-n-gray-500">
          {digitsEnToFa(citiesCount)} شهر
        </span>
      )}
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default LocationProvinceCard
