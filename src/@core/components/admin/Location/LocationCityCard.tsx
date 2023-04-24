import { slugify } from "@/@core/utils/slugify"
import { City } from "@/generated"
import * as Switch from "@radix-ui/react-switch"
import { IconDots, IconGripVertical } from "@tabler/icons-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

interface ILocationProvinceCard {
  countrySlug: string
  provinceSlug: string
  city: City
}

const LocationCityCard = ({
  countrySlug,
  provinceSlug,
  city
}: ILocationProvinceCard) => {
  const { t } = useTranslation("common")
  const { name, slug, isActive } = city
  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2 ps-2">
      <div>
        <IconGripVertical className="h-4.5 w-4.5 text-n-gray-400" />
      </div>
      <Link
        href={`/admin/locations/country/${slugify(
          countrySlug
        )}/province/${provinceSlug}/city/${slug}`}
      >
        <div className="flex flex-col">
          <strong>{name}</strong>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span>۸۴۷۳</span>
              <span>شهر</span>
            </div>
            <div className="flex items-center gap-1">
              <span>۸۴۷۳</span>
              <span>منطقه</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="mr-auto flex items-center gap-2">
        <div className="flex items-center">
          <Switch.Root
            checked={isActive}
            className="group ml-2 h-6 w-9 cursor-pointer touch-none rounded-full border-2 border-transparent bg-n-gray-400 ring-offset-2 ring-offset-n-gray-100 transition duration-200 focus-visible:ring-2 data-[state='checked']:bg-n-green-600"
            style={{ WebkitTapHighlightColor: "transparent" }}
            id="is_active"
          >
            <Switch.Thumb className="block h-5 w-5 origin-right rounded-full bg-white shadow transition-all duration-200 group-focus-visible:w-6 data-[state='checked']:mr-3 data-[state='checked']:group-focus-visible:mr-2" />
          </Switch.Root>
          <label
            className="text-sm font-medium leading-none text-n-gray-700"
            htmlFor="is_active"
          >
            {t("is_active")}
          </label>
        </div>
        <button className="btn-sm btn">
          <IconDots className="icon" />
        </button>
      </div>
    </div>
  )
}

export default LocationCityCard
