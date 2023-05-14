import Breadcrumb from "@core/components/shared/Breadcrumb"
import Sidebar from "@core/components/shared/Sidebar"
import {
  IconAddressBook,
  IconCalendarEvent,
  IconInbox,
  IconMessages,
  IconSearch,
  IconSmartHome,
  IconWallet
} from "@tabler/icons-react"

import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const menus = [
    {
      title: t("Home"),
      path: "/dashboard",
      icon: IconSmartHome
    },
    {
      title: t("Calendar"),
      path: "/dashboard/calendar",
      icon: IconCalendarEvent
    },
    {
      title: t("Task Manager"),
      path: "/dashboard/tasks",
      icon: IconInbox
    },
    {
      title: t("Messenger"),
      path: "/dashboard/messenger",
      icon: IconMessages
    },
    {
      title: t("Contacts"),
      path: "/dashboard/contacts",
      icon: IconAddressBook
    },
    {
      title: t("Finance"),
      path: "/dashboard/finance",
      icon: IconWallet
    }
  ]
  return (
    <>
      <div className="flex h-screen flex-col bg-white">
        <div className="flex h-full">
          <Sidebar menus={menus} />
          <div className="relative mx-auto flex h-auto w-full max-w-7xl flex-col px-4 py-6">
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
                    <span className="font-sans text-sm text-gray-500">⌘K</span>
                  </div>
                </div>
              </form>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
