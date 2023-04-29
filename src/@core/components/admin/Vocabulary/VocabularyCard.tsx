import { Vocabulary } from "@/generated"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Switch from "@radix-ui/react-switch"
import { IconDots } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  vocabulary: Vocabulary
}

const VocabularyCard = ({ vocabulary }: Props) => {
  const { t } = useTranslation("common")
  const { slug, title } = vocabulary
  const [active, setActive] = useState(false)

  return (
    <div className="card flex items-center gap-3 rounded bg-white px-4 py-2">
      <Link href={`/admin/vocabularies/${slug}`}>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <strong>{title}</strong>
          </div>
        </div>
      </Link>
      <div className="mr-auto flex items-center gap-2">
        <div className="flex items-center">
          <Switch.Root
            checked={active}
            onCheckedChange={() => setActive(!active)}
            className="switch group"
            id="is_active"
          >
            <Switch.Thumb className="switch-thumb" />
          </Switch.Root>
          <label
            className="text-sm font-medium leading-none text-n-gray-700"
            htmlFor="is_active"
          >
            {t("is_active")}
          </label>
        </div>
        <div>
          <DropdownMenu.Root dir="rtl">
            <DropdownMenu.Trigger asChild>
              <button className="btn-sm btn-ghost btn">
                <IconDots className="icon" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="dropdown-menu-content">
                <DropdownMenu.Item className="dropdown-menu-item">
                  ویرایش
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="dropdown-menu-separator" />
                <DropdownMenu.Item className="dropdown-menu-item">
                  حذف
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  )
}

export default VocabularyCard
