import { IconChevronLeft } from "@tabler/icons-react"

import { Button } from "@core/components/ui/button"

type MobileFilterItemProps = {
  title: string
}

const MobileFilterItem = ({ title }: MobileFilterItemProps) => {
  return (
    <Button noStyle className="flex w-full items-center justify-between py-3">
      <span className="font-bold text-gray-800">{title}</span>
      <IconChevronLeft className="h-4 w-4 text-gray-400" />
    </Button>
  )
}

export default MobileFilterItem
