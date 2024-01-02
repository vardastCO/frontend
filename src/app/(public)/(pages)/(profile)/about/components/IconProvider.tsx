import { LucideIcon } from "lucide-react"

const IconProvider = ({
  Icon,
  href = ""
}: {
  Icon: LucideIcon
  href: string
}) => {
  return (
    <a
      href={href}
      className="mx-auto flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-primary-50 p-1.5 text-primary"
    >
      <Icon className="h-2/3 w-2/3" />
    </a>
  )
}

export default IconProvider
