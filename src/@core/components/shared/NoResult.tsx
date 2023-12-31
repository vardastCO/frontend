import { Database } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

interface Props {
  entity: string
}

const NoResult = ({ entity }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="mx-auto mt-12 max-w-sm">
      <span className="mb-4 flex h-8 w-8 items-center justify-center rounded bg-alpha-300/50 text-alpha-500">
        <Database className="h-5 w-5" />
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-alpha-800">
        {t("common:create_first_entity_title", {
          entity: t(`common:${entity}`)
        })}
      </h1>
    </div>
  )
}

export default NoResult
