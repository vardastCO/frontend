import ndpLogo from "@/assets/ndp-logo.svg"
import { IconChevronDown } from "@tabler/icons-react"
import Image from "next/image"

type Props = {}

const OrganizationMenu = (props: Props) => {
  return (
    <div className="mb-3">
      <div className="card flex items-center gap-2 rounded p-1">
        <span className="avatar avatar-sm bg-white p-1">
          <Image priority src={ndpLogo} alt="..." className="!rounded-none" />
        </span>
        <span className="truncate text-sm font-medium text-gray-800">
          نیک داده پرداز
        </span>
        <span className="mr-auto flex h-8 w-8 items-center justify-center">
          <IconChevronDown className="h-3 w-3 text-gray-600" />
        </span>
      </div>
    </div>
  )
}

export default OrganizationMenu
