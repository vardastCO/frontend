import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
import { IconSearch } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation("common")
  const menus = [
    {
      title: t("Home"),
      path: "/admin",
      icon: "IconSmartHome"
    },
    {
      title: t("vocabularies.menuTitle"),
      path: "/admin/vocabularies",
      icon: "IconCategory"
    },
    {
      title: t("locations.menuTitle"),
      path: "/admin/locations",
      icon: "IconMap2"
    },
    {
      title: t("users.menuTitle"),
      path: "/admin/users",
      icon: "IconUsers"
    }
  ]
  return (
    <>
      <div className="flex h-screen flex-col bg-gray-100">
        <div className="flex h-auto flex-1 overflow-hidden">
          <Sidebar menus={menus} />
          <div className="relative flex h-auto w-full flex-col overflow-auto overscroll-contain bg-white px-4 py-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col">
              <div className="mb-3 flex items-center">
                <Breadcrumb />
                <form autoComplete="off" action="" className="mr-auto">
                  <div className="input-inset">
                    <div className="input-element">
                      <IconSearch className="h-4 w-4 text-gray-400" />
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
                      <span className="font-sans text-sm text-gray-500">
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
  )
}