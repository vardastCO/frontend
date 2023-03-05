import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconSettings } from "@tabler/icons-react";
import Link from "next/link";

type Props = {};

const SettingMenu = (props: Props) => {
  return (
    <DropdownMenu.Root dir="rtl">
      <DropdownMenu.Trigger asChild>
        <button className="text-n-gray-600 hover:bg-n-gray-200 flex items-center justify-center w-8 h-8 rounded-md">
          <IconSettings className="w-5 h-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-menu-content"
          sideOffset={5}
          side="left"
        >
          <DropdownMenu.Label className="dropdown-menu-label">
            سازمان
          </DropdownMenu.Label>
          <DropdownMenu.Item className="dropdown-menu-item">
            <Link href="/organization/settings">تنظیمات سازمان</Link>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="dropdown-menu-arrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SettingMenu;
