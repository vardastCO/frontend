import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface IProfileItem {
  href: string
  Icon: LucideIcon
  title: string
  id: number
}

const ProfileItem: React.FC<IProfileItem> = ({ href, Icon, title }) => {
  return (
    <Link href={href} prefetch={false} className="flex items-center gap-xs p">
      <Icon className="h-lg w-lg" />
      {title}
    </Link>
  )
}

export default ProfileItem
