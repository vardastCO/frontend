import { getFlagEmoji } from "@/@core/utils/getFlagEmoji"
import { slugify } from "@/@core/utils/slugify"
import { Country } from "@/generated"
import Link from "next/link"

type Props = {
  country: Country
}

const LocationCountryCard = ({ country }: Props) => {
  const { id, name, nameEn, alphaTwo } = country
  return (
    <Link href={`/admin/locations/country/${slugify(nameEn)}`}>
      <div className="card flex items-center gap-3 rounded bg-white py-2 ps-4">
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
      </div>
    </Link>
  )
}

export default LocationCountryCard
