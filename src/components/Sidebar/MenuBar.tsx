import {
  IconAddressBook,
  IconCalendarEvent,
  IconChevronDown,
  IconInbox,
  IconMessages,
  IconSmartHome,
  IconWallet,
} from "@tabler/icons-react";

type Props = {};

const Sidebar = (props: Props) => {
  const menus = [
    {
      title: "خانه",
      path: "/",
      icon: IconSmartHome,
    },
    {
      title: "تقویم کاری",
      path: "/calendar",
      icon: IconCalendarEvent,
    },
    {
      title: "مدیریت وظایف",
      path: "/tasks",
      icon: IconInbox,
    },
    {
      title: "پیام‌رسان",
      path: "/messenger",
      icon: IconMessages,
    },
    {
      title: "مخاطبین",
      path: "/contacts",
      icon: IconAddressBook,
    },
    {
      title: "امور مالی",
      path: "/finance",
      icon: IconWallet,
    },
  ];
  return (
    <div className="border-n-gray-200 flex-shrink-0 w-64 py-5 border-l">
      <div className="flex flex-col w-full h-full">
        <div className="px-4">
          <div className="mb-3">
            <div className="card flex items-center gap-2 p-1 rounded">
              <span className="bg-n-red-400 avatar avatar-sm text-white border-2 border-white">
                ک
              </span>
              <span className="text-n-gray-800 text-sm font-medium">
                دفتر کار کوروش کبیر
              </span>
              <span className="flex items-center justify-center w-8 h-8 mr-auto">
                <IconChevronDown className="text-n-gray-600 w-3 h-3" />
              </span>
            </div>
          </div>
          <div>
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
    </div>
  );
};

export default Sidebar;
