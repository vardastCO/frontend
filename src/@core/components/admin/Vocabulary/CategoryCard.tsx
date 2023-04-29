import { Category } from "@/generated"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import * as Collapsible from "@radix-ui/react-collapsible"
import { IconChevronDown, IconGripVertical } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

type Props = {
  category: Category
}

const CategoryCard = (props: Props) => {
  const { category } = props
  const [open, setOpen] = useState(false)
  const hasChildren: boolean = !!category.children?.length
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <li>
        <div className="card flex items-center rounded bg-white py-2 ps-4">
          <div className="flex items-center gap-px">
            {hasChildren && (
              <Collapsible.Trigger asChild>
                <button
                  className="h-6 w-6 text-n-gray-400 focus:outline-none"
                  type="button"
                >
                  <IconChevronDown
                    className={`h-4 w-4 ${open ? "rotate-270" : "rotate-90"}`}
                  />
                </button>
              </Collapsible.Trigger>
            )}
            <div className="font-bold text-n-gray-800">
              <Link href={`/admin/categories/${category.slug}`}>
                {category.title}
              </Link>
            </div>
            {hasChildren && (
              <span className="tag tag-sm tag-gray rounded-full">
                {digitsEnToFa(category.children?.length as number)}
              </span>
            )}
          </div>
          <button
            className="mr-auto h-6 w-6 cursor-grab text-n-gray-400 focus:outline-none"
            type="button"
          >
            <IconGripVertical className="h-4 w-4" />
          </button>
        </div>
        {/* {hasChildren && (
          <Collapsible.Content>
            <div className="my-2 ms-6 border-0 border-s ps-4">
              <CategoryCard categories={category.children as Category[]} />
            </div>
          </Collapsible.Content>
        )} */}
      </li>
    </Collapsible.Root>
  )
}

export default CategoryCard
