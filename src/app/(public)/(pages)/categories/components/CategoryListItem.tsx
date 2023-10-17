import Image from "next/image"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

import CategoryListLoader, {
  ICategoryListLoader
} from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

interface IVocabularyItem {
  title: string
  isSubCategory?: boolean
  id: number
  src: string
  productsCount: number
  onClick: (_?: any) => void
  selectedItemId: ICategoryListLoader
}

const CategoryListItem = ({
  title,
  src,
  productsCount,
  id,
  isSubCategory,
  onClick,
  selectedItemId
}: IVocabularyItem) => {
  return (
    <li
      className={`${
        isSubCategory ? "h-[calc(40vw)]" : "h-[calc(60vw)]"
      } flex flex-col rounded-2xl bg-alpha-white p-3`}
      onClick={onClick}
    >
      <div className="flex h-12 flex-col gap-y-0.5">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-primary">{`${digitsEnToFa(
          addCommas(productsCount)
        )} کالا`}</p>
      </div>
      <div
        id={`category-image-${id}`}
        className="relative w-full flex-1 flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:w-full"
      >
        {selectedItemId === id ? <CategoryListLoader /> : <></>}
        <Image
          src={src}
          alt={title}
          fill
          // sizes="full, full"
          className="h-full object-contain"
          loading="eager"
          onLoadingComplete={() => {
            const div = document.getElementById(`category-image-${id}`)
            if (div) {
              div.className = div.className + " opacity-100"
            }
          }}
        />
      </div>
    </li>
  )
}

export default CategoryListItem
