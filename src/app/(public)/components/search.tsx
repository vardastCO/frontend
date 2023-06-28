"use client"

import * as Popover from "@radix-ui/react-popover"
import { IconSearch } from "@tabler/icons-react"

import { Button } from "@core/components/ui/button"

type Props = {}

const Search = (props: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          noStyle
          className="flex w-full max-w-sm items-center gap-2 rounded-md bg-gray-100 px-4 py-3"
        >
          <IconSearch className="h-6 w-6 text-gray-400" />
          <span className="text-gray-500">جستجو در وردست...</span>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="card
            -mt-[var(--radix-popper-anchor-height)]
            w-[var(--radix-popper-anchor-width)]
            rounded-md
            px-4
            pt-3"
        >
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <IconSearch className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در وردست..."
              className="w-full border-0 bg-transparent focus:outline-none focus-visible:outline-none"
            />
          </div>
          <div className="py-6">
            <div className="text-sm font-semibold text-gray-700 md:text-base">
              آخرین جستجوی‌های شما
            </div>
            <ul className="hide-scrollbar flex items-center gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap py-4">
              <li>
                <a
                  className="inline-flex rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-700"
                  href={`/search?q=${"سیمان"}`}
                >
                  سیمان
                </a>
              </li>
              <li>
                <a
                  className="inline-flex rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-700"
                  href={`/search?q=${"گچ سفید"}`}
                >
                  گچ سفید
                </a>
              </li>
              <li>
                <a
                  className="inline-flex rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-700"
                  href={`/search?q=${"لوله پولیکا ۱۳ اینچ"}`}
                >
                  لوله پولیکا ۱۳ اینچ
                </a>
              </li>
              <li>
                <a
                  className="inline-flex rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-100 hover:text-gray-700"
                  href={`/search?q=${"میلگرد آجدار شماره ۸ سپاهان"}`}
                >
                  میلگرد آجدار شماره ۸ سپاهان
                </a>
              </li>
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default Search
