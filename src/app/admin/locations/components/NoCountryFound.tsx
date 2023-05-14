import { IconWorldExclamation } from "@tabler/icons-react"

import useTranslation from "next-translate/useTranslation"
import CreateCountry from "./CreateCountry"

const NoCountryFound = () => {
  const { t } = useTranslation()
  return (
    <div className="mx-auto mt-12 max-w-sm">
      <span className="mb-1 flex h-8 w-8 items-center justify-center rounded bg-gray-300/50 text-gray-500">
        <IconWorldExclamation className="h-5 w-5" />
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-gray-800">
        {t("create_first_country_title")}
      </h1>
      <p className="mb-6 leading-relaxed text-gray-600">
        {t("create_first_country_description")}
      </p>
      <CreateCountry />
    </div>
  )
}

export default NoCountryFound
