import { ReactNode } from "react"
import { IconLayoutSidebarRightCollapse, IconSearch } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
import { Button } from "@core/components/ui/button"
import { NavigationType } from "@core/types/Navigation"

type AdminLayoutComponentProps = {
  children: ReactNode
}

const AdminLayoutComponent = ({ children }: AdminLayoutComponentProps) => {
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
              title: t("common:attributes"),
              path: "/admin/attributes",
              icon: "IconStack2"
            },
            {
              title: t("common:brands"),
              path: "/admin/brands",
              icon: "IconTrademark"
            },
            {
              title: t("common:uoms"),
              path: "/admin/uoms",
              icon: "IconRuler"
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
    },
    {
      items: [
        {
          title: "storybook",
          path: "/admin/storybook",
          icon: "IconPalette",
          items: [
            {
              title: "button",
              path: "/admin/storybook/button",
              icon: "IconUsers"
            },
            {
              title: "form",
              path: "/admin/storybook/form",
              icon: "IconUsers"
            }
          ]
        }
      ]
    }
  ]

  return (
    <div className="app">
      <div className="app-inner">
        <Sidebar menus={menus} />
        <div className="app-content">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-3 flex items-center">
              <div className="flex items-center gap-2">
                <Button variant="ghost" iconOnly>
                  <IconLayoutSidebarRightCollapse className="icon" />
                </Button>
                <Breadcrumb />
              </div>
              <form autoComplete="off" action="" className="mr-auto">
                <div className="form-control form-control-sm">
                  <div className="input-group">
                    <div className="input-inset">
                      <div className="input-element">
                        <IconSearch />
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
                        <span className="font-sans text-sm text-gray-400">
                          ⌘K
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayoutComponent
