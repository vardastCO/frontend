import { slugify } from "@/@core/utils/slugify"
import { City } from "@/generated"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
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
              <span>منطقه</span>
            </div>
          </div>
        </div>
      </Link>
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
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger asChild>
            <button className="btn-sm btn-ghost btn">
              <IconDots className="icon" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-menu-content">
              <DropdownMenu.Item className="dropdown-menu-item">
                ویرایش
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="dropdown-menu-separator" />
              <DropdownMenu.Item className="dropdown-menu-item">
                حذف
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  )
}

export default LocationCityCard
