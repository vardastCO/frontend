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
      className="mx-auto flex h-4xl w-4xl flex-col items-center justify-center rounded-lg bg-primary-50 p-sm text-primary"
    >
      <Icon className="h-full w-full" />
    </a>
  )
}

export default IconProvider
