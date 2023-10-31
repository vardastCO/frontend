const VocabularySkeleton = ({ isSubCategory }: { isSubCategory?: boolean }) => {
  return (
    <li
      className={`${
        isSubCategory ? "h-[calc(40vw)]" : "h-[calc(60vw)]"
      } flex animate-pulse flex-col gap-3 rounded-2xl bg-alpha-200 p-3`}
    ></li>
  )
}

const CategorySkeleton = ({ isSubCategory }: { isSubCategory?: boolean }) => {
  return [...Array(7)].map((_, index) => (
    <VocabularySkeleton isSubCategory={isSubCategory} key={index} />
  ))
}

export default CategorySkeleton
