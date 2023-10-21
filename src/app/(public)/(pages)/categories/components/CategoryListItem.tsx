import Image from "next/image"
import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"

import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

interface IVocabularyItem {
  title: string
  isSubCategory?: boolean
  id: number
  src: string
  productsCount: number
  onClick: (_?: any) => void
  selectedItemId: ICategoryListLoader
  href: string
}

const CategoryListItem = ({
  title,
  src,
  productsCount,
  id,
  isSubCategory,
  onClick,
  // selectedItemId,
  href
}: IVocabularyItem) => {
  return (
    <Link
      href={href}
      className={clsx(
        isSubCategory ? "h-[calc(42vw)]" : "h-[calc(60vw)]",
        isSubCategory ? "grid-rows-7" : "grid-rows-4",
        "relative grid gap-4 overflow-hidden rounded-2xl bg-alpha-white hover:border hover:!border-primary active:border active:!border-primary"
      )}
      onClick={onClick}
      shallow
    >
      {/* {selectedItemId === id ? <CategoryListLoader /> : <></>} */}
      <div
        className={`${
          isSubCategory ? "row-span-3 justify-center" : "justify-end"
        } flex flex-col gap-y-0.5 px-3`}
      >
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-primary">{`${digitsEnToFa(
          addCommas(productsCount)
        )} کالا`}</p>
      </div>
      <div
        id={`category-image-${id}`}
        className={`${
          isSubCategory ? "row-span-4" : "row-span-3"
        } w-full flex-1 flex-shrink-0 bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out`}
      >
        <Image
          src={src}
          // src={`/images/categories/${id}.png`}
          alt={title}
          width={isSubCategory ? 800 : 1000}
          height={isSubCategory ? 450 : 1000}
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
    </Link>
  )
}

export default CategoryListItem
