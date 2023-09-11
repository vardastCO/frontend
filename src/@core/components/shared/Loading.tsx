import { RefreshCcw } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

type Props = {}

const Loading = (_: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-auto items-center justify-center py-8">
      <div className="text-center">
        <RefreshCcw className="mx-auto mb-3 h-6 w-6 animate-spin text-gray-400" />
        <h3 className="mb-1 font-bold text-gray-700">
          {t("common:loading_please_wait")}
        </h3>
      </div>
    </div>
  )
}

export default Loading
