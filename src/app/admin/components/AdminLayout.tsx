"use client"

import { ReactNode, Suspense, useState } from "react"
import { LucideMenu } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
import { Button } from "@core/components/ui/button"
import { NavigationType } from "@core/types/Navigation"

type AdminLayoutComponentProps = {
  children: ReactNode
}

const AdminLayoutComponent = ({ children }: AdminLayoutComponentProps) => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
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
          abilities: "gql.products.product.index",
          items: [
            {
              title: t("common:all_entities", { entity: t("common:products") }),
              path: "/admin/products",
              icon: "package",
              abilities: "gql.products.product.index"
            },
            {
              title: t("common:attributes"),
              path: "/admin/attributes",
              icon: "layers",
              abilities: "gql.products.attribute.index"
            },
            {
              title: t("common:brands"),
              path: "/admin/brands",
              icon: "fingerprint",
              abilities: "gql.products.brand.index"
            },
            {
              title: t("common:uoms"),
              path: "/admin/uoms",
              icon: "ruler",
              abilities: "gql.products.uom.index"
            }
          ]
        },
        {
          title: t("common:sellers"),
          path: "/admin/sellers",
          icon: "store",
          abilities: "gql.products.seller.index"
        }
      ]
    },
    {
      title: t("common:administration"),
      role: "admin",
      items: [
        {
          title: t("common:vocabularies_menu_title"),
          path: "/admin/vocabularies",
          icon: "layout-grid",
          abilities: "gql.base.taxonomy.vocabulary.index"
        },
        {
          title: t("common:locations_menu_title"),
          path: "/admin/locations",
          icon: "map",
          abilities: "gql.base.location.country.index"
        },
        {
          title: t("common:users_menu_title"),
          path: "/admin/users",
          icon: "users",
          abilities: "gql.users.user.index"
        }
      ]
    }
  ]

  return (
    <div className="app">
      <div className="app-inner">
        <Sidebar
          menus={menus}
          open={sidebarOpen}
          onOpenChanged={setSidebarOpen}
        />
        <div className="app-content">
          <div className="mx-auto flex w-full flex-col">
            <div className="mb-3 flex items-center gap-2">
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                iconOnly
                className="lg:hidden"
              >
                <LucideMenu className="icon" />
              </Button>
              <div className="flex-1 overflow-y-auto">
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
