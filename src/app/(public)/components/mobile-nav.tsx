import Link from "next/link"
import { IconCategory, IconSearch, IconUserCircle } from "@tabler/icons-react"

type Props = {}

const MobileNavigation = (props: Props) => {
  return (
    <div className="block md:hidden">
      <div className="h-16" aria-hidden="true"></div>
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
          <Link
            href="/"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconSearch className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              جستجو
            </span>
          </Link>
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconCategory className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              دسته‌بندی‌ها
            </span>
          </button>
          <button
            type="button"
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <IconUserCircle className="mb-2 h-5 w-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
              وردست من
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation
