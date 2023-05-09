import { IconRefresh } from "@tabler/icons-react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/navigation"

type Props = {}

const LoadingFailed = (props: Props) => {
  const router = useRouter()
  const { t } = useTranslation("common")
  return (
    <div className="flex h-auto items-center justify-center py-8">
      <div className="text-center">
        <button className="mb-3" onClick={() => router.refresh()}>
          <IconRefresh className="h-6 w-6 text-gray-400" />
        </button>
        <h3 className="mb-1 font-bold text-gray-700">
          {t("something_went_wrong")}
        </h3>
        <p className="text-gray-500">{t("try_to_reload_the_page")}</p>
      </div>
    </div>
  )
}

export default LoadingFailed
