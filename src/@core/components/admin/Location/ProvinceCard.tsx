import { Province } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import Link from "next/link"
import { useState } from "react"
import { Switch } from "../../ui/Switch"

interface ProvinceCardProps {
  countrySlug: string
  province: Province
}

const ProvinceCard = ({ countrySlug, province }: ProvinceCardProps) => {
  const { name, slug, isActive, citiesCount } = province

  const [active, setActive] = useState(isActive)

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
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default ProvinceCard
