import Image from "next/image"

import LocationSelector from "./location-selector"
import Navigation from "./navigation"
import Search from "./search"

const Header = () => {
  return (
    <div className="flex flex-col gap-4 border-gray-200 bg-white p-4 pb-0 lg:border-b">
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="relative h-8 lg:h-12">
          <Image
            src="/images/logo-type.png"
            alt="..."
            loading="lazy"
            width={1315}
            height={186}
            className="hidden h-12 w-auto object-contain lg:block"
          />
          <Image
            src="/images/logo.png"
            alt="..."
            loading="lazy"
            width={853}
            height={652}
            className="h-8 w-auto object-contain lg:hidden"
          />
        </div>
        <div className="flex-1">
          <Search />
        </div>
      </div>
      <div className="hidden items-start justify-between lg:flex">
        <Navigation />
        <LocationSelector />
      </div>
    </div>
  )
}

export default Header
