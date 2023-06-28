import { IconSearch } from "@tabler/icons-react"

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="flex max-w-sm items-center gap-2 rounded-sm bg-gray-100 px-4 py-3">
      <IconSearch className="h-6 w-6 text-gray-300" />
      <input
        type="text"
        className="w-full flex-1 border-none bg-transparent focus:outline-none focus-visible:outline-none lg:text-lg"
        placeholder="جستجو در وردست..."
      />
    </div>
  )
}

export default Search
