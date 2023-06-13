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
    <div className="app-sidebar">
      <div className="app-sidebar-inner">
        {/* <SpacesBar /> */}
        <div className="app-navigation">
          <div className="flex h-full w-full flex-col">
            <div className="flex h-full flex-col px-4">
              <OrganizationMenu />
              <div className="app-navigation-container">
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
