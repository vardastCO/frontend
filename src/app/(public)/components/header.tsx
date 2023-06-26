import LocationSelector from "./location-selector"
import Logo from "./logo"
import Navigation from "./navigation"
import Search from "./search"

const Header = () => {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 bg-white p-4 pb-0">
      <div className="flex items-center gap-8">
        <div className="relative h-12">
          <Logo />
        </div>
        <div className="flex-1">
          <Search />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <Navigation />
        <LocationSelector />
      </div>
    </div>
  )
}

export default Header
