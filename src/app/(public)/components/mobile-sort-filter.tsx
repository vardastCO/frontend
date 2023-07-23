"use client"

import { useContext } from "react"
import { useMediaQuery } from "@mantine/hooks"
import * as Dialog from "@radix-ui/react-dialog"
import { IconArrowRight } from "@tabler/icons-react"
import clsx from "clsx"
import { useAtom } from "jotai"

import { ProductSortablesEnum } from "@/generated"

import { Button } from "@core/components/ui/button"
import { PublicContext } from "@/app/(public)/components/public-provider"

type MobileSortFilterProps = {
  sort: ProductSortablesEnum
  onSortChanged: (sort: ProductSortablesEnum) => void
}

const MobileSortFilter = ({ sort, onSortChanged }: MobileSortFilterProps) => {
  const { sortFilterVisibilityAtom } = useContext(PublicContext)
  const [sortFilterVisibility, setSortFilterVisibility] = useAtom(
    sortFilterVisibilityAtom
  )

  const isTabletOrMobile = useMediaQuery("(max-width: 640px)", true, {
    getInitialValueInEffect: false
  })

  return (
    isTabletOrMobile && (
      <Dialog.Root
        open={sortFilterVisibility}
        onOpenChange={setSortFilterVisibility}
      >
        <Dialog.Content className="fixed inset-0 z-40 h-[calc(100%-calc(64px+var(--safe-aera-inset-bottom)))] overflow-y-auto overscroll-contain bg-white">
          <div>
            <div className="sticky top-0 border-b border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setSortFilterVisibility(false)}
                  variant="ghost"
                  size="small"
                  iconOnly
                >
                  <IconArrowRight className="h-5 w-5" />
                </Button>
                <div className="font-bold text-gray-800">مرتب‌سازی</div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-col divide-y divide-gray-200">
                <Button
                  noStyle
                  className={clsx([
                    "py-3 text-start",
                    sort === ProductSortablesEnum.Newest
                      ? "font-bold text-brand-500"
                      : "text-gray-700"
                  ])}
                  onClick={() => onSortChanged(ProductSortablesEnum.Newest)}
                >
                  جدیدترین
                </Button>
                <Button
                  noStyle
                  className={clsx([
                    "py-3 text-start",
                    sort === ProductSortablesEnum.MostAffordable
                      ? "font-bold text-brand-500"
                      : "text-gray-700"
                  ])}
                  onClick={() =>
                    onSortChanged(ProductSortablesEnum.MostAffordable)
                  }
                >
                  ارزان‌ترین
                </Button>
                <Button
                  noStyle
                  className={clsx([
                    "py-3 text-start",
                    sort === ProductSortablesEnum.MostExpensive
                      ? "font-bold text-brand-500"
                      : "text-gray-700"
                  ])}
                  onClick={() =>
                    onSortChanged(ProductSortablesEnum.MostExpensive)
                  }
                >
                  گران‌ترین
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    )
  )
}

export default MobileSortFilter
