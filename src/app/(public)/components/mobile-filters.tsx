"use client"

import { useContext } from "react"
import { useMediaQuery } from "@mantine/hooks"
import * as Dialog from "@radix-ui/react-dialog"
import { IconArrowRight } from "@tabler/icons-react"
import { useAtom } from "jotai"

import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

type MobileFiltersProps = {}

const MobileFilters = (props: MobileFiltersProps) => {
  const { filtersVisibilityAtom } = useContext(PublicContext)
  const [filtersVisibility, setFiltersVisibility] = useAtom(
    filtersVisibilityAtom
  )

  const isTabletOrMobile = useMediaQuery("(max-width: 640px)", true, {
    getInitialValueInEffect: false
  })

  return (
    isTabletOrMobile && (
      <Dialog.Root open={filtersVisibility} onOpenChange={setFiltersVisibility}>
        <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-aera-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
          <div>
            <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setFiltersVisibility(false)}
                  variant="ghost"
                  size="small"
                  iconOnly
                >
                  <IconArrowRight className="h-5 w-5" />
                </Button>
                <div className="font-bold text-gray-800">فیلترها</div>
              </div>
            </div>
            <div className="p-4"></div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    )
  )
}

export default MobileFilters
