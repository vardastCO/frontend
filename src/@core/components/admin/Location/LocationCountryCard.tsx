import { getFlagEmoji } from "@/@core/utils/getFlagEmoji"
import { Country } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import * as Switch from "@radix-ui/react-switch"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  country: Country
}

const LocationCountryCard = ({ country }: Props) => {
  const { t } = useTranslation("common")
  const { name, slug, alphaTwo, isActive, provincesCount } = country
  const [active, setActive] = useState(isActive)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link href={`/admin/locations/country/${slug}`}>
        <div className="flex items-center gap-2">
          <span className=" align-baseline text-3xl leading-none">
            {getFlagEmoji(alphaTwo)}
          </span>
          <div className="flex flex-col">
            <strong>{name}</strong>
            <div className="mt-1 flex items-center gap-2 text-sm">
              {provincesCount !== 0 && (
                <div className="flex items-center gap-1">
                  <span>{digitsEnToFa(provincesCount)}</span>
                  <span>استان</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="mr-auto flex items-center gap-2">
        <div className="flex items-center">
          <Switch.Root
            checked={active}
            onCheckedChange={() => setActive(!active)}
            className="switch group"
            id="is_active"
          >
            <Switch.Thumb className="switch-thumb" />
          </Switch.Root>
          <label
            className="text-sm font-medium leading-none text-n-gray-700"
            htmlFor="is_active"
          >
            {t("is_active")}
          </label>
        </div>
      </div>
    </div>
  )
}

export default LocationCountryCard
