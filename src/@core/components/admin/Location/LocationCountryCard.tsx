import { getFlagEmoji } from "@/@core/utils/getFlagEmoji"
import { Country } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Switch } from "../../ui/Switch"

type Props = {
  country: Country
}

const LocationCountryCard = ({ country }: Props) => {
  const { t } = useTranslation("common")
  const { name, slug, alphaTwo, isActive, provincesCount } = country
  const [active, setActive] = useState(isActive)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="align-baseline text-2xl leading-none">
          {getFlagEmoji(alphaTwo)}
        </span>
        <Link
          href={`/admin/locations/country/${slug}`}
          className="font-bold text-n-gray-800 underline-offset-2 hover:text-n-gray-900 hover:underline"
        >
          {name}
        </Link>
        {provincesCount !== 0 && (
          <span className="text-sm text-n-gray-500">
            {digitsEnToFa(provincesCount)} استان
          </span>
        )}
      </div>
      <div className="mr-auto flex items-center gap-2">
        <Switch onChange={setActive} isSelected={active} size="small">
          {t("is_active")}
        </Switch>
      </div>
    </div>
  )
}

export default LocationCountryCard
