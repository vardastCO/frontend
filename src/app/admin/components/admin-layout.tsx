import { ReactNode, Suspense } from "react"
import useTranslation from "next-translate/useTranslation"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
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
          icon: "home"
        },
        {
          title: t("common:products"),
          path: "/admin/products",
          icon: "package",
          items: [
            {
              title: t("common:all_entities", { entity: t("common:products") }),
              path: "/admin/products",
              icon: "package"
            },
            {
              title: t("common:attributes"),
              path: "/admin/attributes",
              icon: "layers"
            },
            {
              title: t("common:brands"),
              path: "/admin/brands",
              icon: "fingerprint"
            },
            {
              title: t("common:uoms"),
              path: "/admin/uoms",
              icon: "ruler"
            }
          ]
        },
        {
          title: t("common:sellers"),
          path: "/admin/sellers",
          icon: "store"
        }
      ]
    },
    {
      title: t("common:administration"),
      items: [
        {
          title: t("common:vocabularies_menu_title"),
          path: "/admin/vocabularies",
          icon: "layout-grid"
        },
        {
          title: t("common:locations_menu_title"),
          path: "/admin/locations",
          icon: "map"
        },
        {
          title: t("common:users_menu_title"),
          path: "/admin/users",
          icon: "users"
        }
      ]
    },
    {
      items: [
        {
          title: "storybook",
          path: "/admin/storybook",
          icon: "paintbrush-2",
          items: [
            {
              title: "button",
              path: "/admin/storybook/button",
              icon: "users"
            },
            {
              title: "form",
              path: "/admin/storybook/form",
              icon: "users"
            }
          ]
        }
      ]
    }
  ]

  return (
    <div className="app">
      <div className="app-inner">
        <Suspense>
          <Sidebar menus={menus} />
        </Suspense>
        <div className="app-content">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-3 flex items-center">
              <div className="flex items-center gap-2">
                <Suspense>
                  <Breadcrumb />
                </Suspense>
              </div>
              {/* <form autoComplete="off" action="" className="mr-auto">
                <div className="form-control form-control-sm">
                  <div className="input-group">
                    <div className="input-inset">
                      <div className="input-element">
                        <LucideSearch />
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
              </form> */}
            </div>
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayoutComponent
