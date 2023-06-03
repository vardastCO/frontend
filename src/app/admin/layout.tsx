import { Button } from "@core/components/Button"
import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
import { NavigationType } from "@core/types/Navigation"
import { IconLayoutSidebarRightCollapse, IconSearch } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation("common")
  const menus: NavigationType[] = [
    {
      items: [
        {
          title: t("common:home"),
          path: "/admin",
          icon: "IconSmartHome"
        },
        {
          title: t("common:products"),
          path: "/admin/products",
          icon: "IconPackage",
          items: [
            {
              title: t("common:all_entities", { entity: t("common:products") }),
              path: "/admin/products",
              icon: "IconPackage"
            },
            {
              title: t("product:attributes"),
              path: "/admin/attributes/",
              icon: "IconStack2"
            }
          ]
        }
      ]
    },
    {
      title: t("common:administration"),
      items: [
        {
          title: t("common:vocabularies_menu_title"),
          path: "/admin/vocabularies",
          icon: "IconCategory"
        },
        {
          title: t("common:locations_menu_title"),
          path: "/admin/locations",
          icon: "IconMap2"
        },
        {
          title: t("common:users_menu_title"),
          path: "/admin/users",
          icon: "IconUsers"
        }
      ]
    }
  ]
  return (
    <>
      <div className="app">
        <div className="app-inner">
          <Sidebar menus={menus} />
          <div className="app-content">
            <div className="mx-auto flex w-full flex-col">
              <div className="mb-3 flex items-center">
                <div className="flex items-center gap-2">
                  <Button intent="ghost" iconOnly>
                    <IconLayoutSidebarRightCollapse className="icon" />
                  </Button>
                  <Breadcrumb />
                </div>
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
              <div className="mx-auto w-full max-w-5xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
