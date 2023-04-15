import { ICategory } from "@/@core/types/Category";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import * as Collapsible from "@radix-ui/react-collapsible";
import { IconChevronDown, IconGripVertical } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import CategoryList from "./CategoryList";

type Props = {
  category: ICategory;
};

const CategoryListItem = (props: Props) => {
  const { category } = props;
  const [open, setOpen] = useState(false);
  const hasChildren: boolean = !!category.children?.length;
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <li draggable>
        <div className="card ps-4 flex items-center py-2 rounded">
          <div className="flex items-center gap-px">
            {hasChildren && (
              <Collapsible.Trigger asChild>
                <button
                  className="focus:outline-none text-n-gray-400 w-6 h-6"
                  type="button"
                >
                  <IconChevronDown
                    className={`w-4 h-4 ${open ? "rotate-270" : "rotate-90"}`}
                  />
                </button>
              </Collapsible.Trigger>
            )}
            <div className="text-n-gray-800 font-bold">
              <Link href={`/admin/categories/${category.slug}`}>
                {category.title}
              </Link>
            </div>
            {hasChildren && (
              <span className="tag tag-gray tag-sm rounded-full">
                {digitsEnToFa(category.children?.length as number)}
              </span>
            )}
          </div>
          <button
            className="focus:outline-none text-n-gray-400 cursor-grab w-6 h-6 mr-auto"
            type="button"
          >
            <IconGripVertical className="w-4 h-4" />
          </button>
        </div>
        {hasChildren && (
          <Collapsible.Content>
            <div className="ms-6 ps-4 border-s my-2 border-0">
              <CategoryList categories={category.children as ICategory[]} />
            </div>
          </Collapsible.Content>
        )}
      </li>
    </Collapsible.Root>
  );
};

export default CategoryListItem;
