import { IconCategory, IconMap2, IconSmartHome } from "@tabler/icons-react";
import useTranslation from "next-translate/useTranslation";

type Props = {};

const AdminMenus = (props: Props) => {
  const { t } = useTranslation("common");

  const menus = [
    {
      title: t("Home"),
      path: "/",
      icon: IconSmartHome,
    },
    {
      title: t("Categories"),
      path: "/admin/categories",
      icon: IconCategory,
    },
    {
      title: t("Geolocations"),
      path: "/admin/geolocations",
      icon: IconMap2,
    },
  ];
  return (
    <div className="border-n-gray-200 flex-shrink-0 w-64 py-5 border-l">
      <div className="flex flex-col w-full h-full">
        <div className="px-4">
          <ol>
            {menus.map((menu, idx) => {
              return (
                <li key={idx}>
                  <a
                    href={menu.path}
                    className="hover:bg-n-gray-100 text-n-gray-700 flex items-center w-full px-2 py-3 space-x-2 space-x-reverse font-semibold leading-normal rounded"
                  >
                    <menu.icon
                      className="text-n-gray-400 w-5 h-5"
                      strokeWidth={1.5}
                    />
                    <span>{menu.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminMenus;
