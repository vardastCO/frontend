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
  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4 divide-alpha-200 p-6">
      {[...Array(7)].map((_, index) => (
        <VocabularySkeleton isSubCategory={isSubCategory} key={index} />
      ))}
    </ul>
  )
}

export default CategorySkeleton
