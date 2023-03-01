import { IconHelp, IconPlus, IconSettings } from "@tabler/icons-react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="bg-n-gray-25 border-n-gray-200 flex-shrink-0 py-6 border-l">
      <div className="flex flex-col w-full h-full px-3">
        <div className="flex flex-col space-y-3">
          <span
            data-n-tooltip="دفتر کوروش کبیر"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="bg-n-red-400 avatar avatar-sm ring-2 ring-n-red-400 text-white border-2 border-white">
              ک
            </button>
          </span>
          <span
            data-n-tooltip="دفتر احمد برزگر"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="bg-n-yellow-400 avatar avatar-sm text-white">
              ب
            </button>
          </span>
          <span
            data-n-tooltip="افزودن سازمان جدید"
            data-n-tooltip-config="left"
            className="cursor-pointer"
          >
            <button className="border-n-gray-400 text-n-gray-500 inline-flex items-center justify-center w-8 h-8 border border-dashed rounded-md">
              <IconPlus className="w-4 h-4" />
            </button>
          </span>
        </div>
        <div className="flex flex-col mt-auto space-y-3">
          <button className="text-n-gray-600 hover:bg-n-gray-200 flex items-center justify-center w-8 h-8 rounded-md">
            <IconHelp className="w-5 h-5" />
          </button>
          <button className="text-n-gray-600 hover:bg-n-gray-200 flex items-center justify-center w-8 h-8 rounded-md">
            <IconSettings className="w-5 h-5" />
          </button>
          <button className="bg-n-yellow-400 avatar avatar-sm text-white">
            ع
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
