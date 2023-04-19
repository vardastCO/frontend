import { getFlagEmoji } from "@/@core/utils/getFlagEmoji";
import { slugify } from "@/@core/utils/slugify";
import { Country } from "@/gql/graphql";
import Link from "next/link";

type Props = {
  country: Country;
};

const LocationCountryCard = ({ country }: Props) => {
  const { id, name, nameEn, alphaTwo } = country;
  return (
    <Link href={`/admin/locations/country/${slugify(nameEn)}`}>
      <div className="card ps-4 flex items-center gap-3 py-2 bg-white rounded">
        <span className=" text-3xl leading-none align-baseline">
          {getFlagEmoji(alphaTwo)}
        </span>
        <div className="flex flex-col">
          <strong>{name}</strong>
          <div className="flex items-center gap-2 mt-1 text-sm">
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
  );
};

export default LocationCountryCard;
