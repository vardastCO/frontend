import Breadcrumb from "@/@core/components/shared/Breadcrumb/Breadcrumb";
import {
  IconCategory,
  IconMap2,
  IconSearch,
  IconSmartHome,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Sidebar from "../components/shared/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("common");
  const menus = [
    {
      title: t("Home"),
      path: "/admin",
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
    <>
      <div className="flex flex-col h-screen bg-white">
        <div className="flex flex-1 h-auto overflow-hidden">
          <Sidebar menus={menus} />
          <div className="overscroll-contain relative flex flex-col w-full h-auto px-4 py-6 overflow-auto">
            <div className="max-w-7xl flex flex-col w-full mx-auto">
              <div className="flex items-center mb-3">
                <Breadcrumb />
                <form autoComplete="off" action="" className="mr-auto">
                  <div className="input-inset">
                    <div className="input-element">
                      <IconSearch className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="جستجو..."
                      autoComplete="off"
                      name="search"
                      tabIndex={-1}
                      role="presentation"
                    />
                    <div className="input-element" dir="ltr">
                      <span className="text-n-gray-500 font-sans text-sm">
                        ⌘K
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
