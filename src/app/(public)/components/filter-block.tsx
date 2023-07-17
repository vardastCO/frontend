import { ReactNode, useState } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { IconChevronDown } from "@tabler/icons-react"
import clsx from "clsx"

import { Button } from "@core/components/ui/button"

type FilterBlockProps = {
  title: string
  children: ReactNode
}

const FilterBlock = ({ title, children }: FilterBlockProps) => {
  const [open, setOpen] = useState(false)

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
        <div className="max-h-[400px] overflow-y-auto border-t border-gray-200">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default FilterBlock
