import { IconHelp, IconPlus } from "@tabler/icons-react"
import SettingMenu from "./SettingMenu"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="bg-gray-25 flex-shrink-0 border-l border-gray-200 py-6">
      <div className="flex h-full w-full flex-col px-3">
        <div className="flex flex-col space-y-3">
          <span
            data-n-tooltip="دفتر کوروش کبیر"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="avatar avatar-sm border-2 border-white bg-red-400 text-white ring-2 ring-red-400">
              ک
            </button>
          </span>
          <span
            data-n-tooltip="دفتر احمد برزگر"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="avatar avatar-sm bg-amber-400 text-white">
              ب
            </button>
          </span>
          <span
            data-n-tooltip="افزودن سازمان جدید"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-gray-400 text-gray-500">
              <IconPlus className="h-4 w-4" />
            </button>
          </span>
        </div>
        <div className="mt-auto flex flex-col space-y-3">
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200">
            <IconHelp className="h-5 w-5" />
          </button>
          <SettingMenu />
          <button className="avatar avatar-sm bg-amber-400 text-white">
            ع
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
