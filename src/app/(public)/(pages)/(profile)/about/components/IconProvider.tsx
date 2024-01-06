import { LucideIcon } from "lucide-react"

import Link from "@core/components/shared/Link"

const IconProvider = ({
  Icon,
  href = ""
}: {
  Icon: LucideIcon
  href: string
}) => {
  return (
    <Link
      href={href}
      className="mx-auto flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-alpha-50 p-1.5 text-primary"
    >
      <Icon className="h-2/3 w-2/3" />
    </Link>
  )
}

export default IconProvider
