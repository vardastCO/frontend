import { getFlagEmoji } from "@/@core/utils/getFlagEmoji"
import { slugify } from "@/@core/utils/slugify"
import { Country } from "@/generated"
import * as Switch from "@radix-ui/react-switch"
import Link from "next/link"
import { useTranslation } from "react-i18next"

type Props = {
  country: Country
}

const LocationCountryCard = ({ country }: Props) => {
  const { t } = useTranslation("common")
  const { name, slug, alphaTwo, isActive } = country

  return (
    <Link href={`/admin/locations/country/${slugify(slug)}`}>
      <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
        <span className=" align-baseline text-3xl leading-none">
          {getFlagEmoji(alphaTwo)}
        </span>
        <div className="flex flex-col">
          <strong>{name}</strong>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span>۳۲</span>
              <span>استان</span>
            </div>
            <div className="flex items-center gap-1">
              <span>۸۴۷۳</span>
              <span>شهر</span>
            </div>
          </div>
        </div>
        <div className="mr-auto flex items-center gap-2">
          <div className="flex items-center">
            <Switch.Root
              checked={isActive}
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
    </Link>
  )
}

export default LocationCountryCard
