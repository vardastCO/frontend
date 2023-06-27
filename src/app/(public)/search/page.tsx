import ProductCount from "../components/product-count"
import ProductList from "../components/product-list"
import ProductSort from "../components/product-sort"
import VocabularyFilter from "../components/vocabulary-filter"

const Search = () => {
  return (
    <div className="grid grid-cols-[3fr_9fr] gap-5">
      <div>
        <VocabularyFilter />
      </div>
      <div>
        <div className="flex items-center border-b border-gray-200 py-3">
          <ProductSort />
          <ProductCount />
        </div>
        <div>
          <ProductList />
        </div>
      </div>
    </div>
  )
}

export default Search
