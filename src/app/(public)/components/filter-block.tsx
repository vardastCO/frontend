import { ReactNode, useState } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { IconChevronDown } from "@tabler/icons-react"
import clsx from "clsx"

import { Button } from "@core/components/ui/button"

type FilterBlockProps = {
  title: string
  children: ReactNode
  openDefault?: boolean
}

const FilterBlock = ({
  title,
  children,
  openDefault = false
}: FilterBlockProps) => {
  const [open, setOpen] = useState(openDefault)

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <div className="flex items-center py-3">
        <span className="font-bold text-gray-800">{title}</span>
        <Collapsible.Trigger asChild>
          <Button variant="ghost" size="small" className="mr-auto" iconOnly>
            <IconChevronDown
              className={clsx(["icon", open ? "rotate-180" : ""])}
            />
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <div className="max-h-[400px] overflow-y-auto pb-3">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default FilterBlock
