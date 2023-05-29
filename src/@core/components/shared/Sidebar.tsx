import { NavigationType } from "@core/types/Navigation"
import Navigation from "./Navigation"
import OrganizationMenu from "./OrganizationMenu"
import UserMenu from "./UserMenu"

type Props = {
  menus: NavigationType[]
}

const Sidebar = (props: Props) => {
  const { menus } = props
  return (
    <div className="sticky top-0 flex-shrink-0">
      <div className="relative flex h-full">
        {/* <SpacesBar /> */}
        <div className="z-10 w-80 flex-shrink-0 border-l border-gray-200 py-5 transition-all">
          <div className="flex h-full w-full flex-col">
            <div className="flex h-full flex-col px-4">
              <OrganizationMenu />
              <div className="flex flex-1 flex-col gap-8">
                <Navigation menus={menus} />
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
