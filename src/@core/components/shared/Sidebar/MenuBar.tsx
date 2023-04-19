import { IconChevronDown, type Icon } from "@tabler/icons-react";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  menus: {
    title: string;
    path: string;
    icon: Icon;
  }[];
};

const Sidebar = (props: Props) => {
  const router = useRouter();

  const isActive = (linkPath: string): boolean => {
    const currentPathModified = router.pathname.split("/").slice(2).join("/");
    const linkPathModified = linkPath.split("/").slice(2).join("/");
    return linkPathModified === currentPathModified
      ? true
      : linkPathModified !== "" &&
          currentPathModified.startsWith(linkPathModified);
  };

  return (
    <div
      className={clsx([
        "border-n-gray-200 flex-shrink-0 py-5 border-l z-10 transition-all",
        props.open && "w-64",
        ,
        !props.open && "w-0 overflow-hidden translate-x-full opacity-0",
      ])}
    >
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
              {props.menus.map((menu, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={menu.path}
                      className={clsx([
                        "hover:bg-n-gray-100 text-n-gray-700 flex items-center w-full px-2 py-3 space-x-2 space-x-reverse font-semibold leading-normal rounded",
                        isActive(menu.path) ? "bg-n-gray-100" : "",
                      ])}
                    >
                      <menu.icon
                        className="text-n-gray-400 w-5 h-5"
                        strokeWidth={1.5}
                      />
                      <span>{menu.title}</span>
                    </Link>
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
