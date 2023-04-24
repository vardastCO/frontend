import { IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

type Props = {};

const LoadingFailed = (props: Props) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <div className="flex items-center justify-center h-auto py-8">
      <div className="text-center">
        <button className="mb-3" onClick={() => router.refresh()}>
          <IconRefresh className="text-n-gray-400 w-6 h-6" />
        </button>
        <h3 className="text-n-gray-700 mb-1 font-bold">
          {t("something_went_wrong")}
        </h3>
        <p className="text-n-gray-500">{t("try_to_reload_the_page")}</p>
      </div>
    </div>
  );
};

export default LoadingFailed;
