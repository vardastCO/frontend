import { ICategory } from "@/@core/types/Category";
import CategoryListItem from "./CategoryListItem";

type Props = {
  categories: ICategory[];
};

const CategoryList = (props: Props) => {
  const { categories } = props;
  return (
    <ul className="flex flex-col gap-2">
      {categories.length > 0 &&
        categories.map((category: ICategory, idx: number) => (
          <CategoryListItem category={category} key={idx} />
        ))}
    </ul>
  );
};

export default CategoryList;
