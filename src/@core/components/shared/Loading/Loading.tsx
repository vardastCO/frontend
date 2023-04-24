import { IconRefresh } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";

type Props = {};

const Loading = (props: Props) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex items-center justify-center h-auto py-8">
      <div className="text-center">
        <IconRefresh className="text-n-gray-400 animate-spin w-6 h-6 mx-auto mb-3" />
        <h3 className="text-n-gray-700 mb-1 font-bold">
          {t("loading_please_wait")}
        </h3>
      </div>
    </div>
  );
};

export default Loading;
