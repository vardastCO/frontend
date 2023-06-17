import { useContext } from "react"
import useTranslation from "next-translate/useTranslation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@core/components/ui/dropdown-menu"

import { LocationsContext } from "./LocationsProvider"

type Props = {}

const FiltersBar = (props: Props) => {
  const { t } = useTranslation()
  const { activesOnly, setActivesOnly, toggleActivesOnly } =
    useContext(LocationsContext)
  return (
    <div className="mb-6 flex items-center">
      <div className="mr-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <MenuTrigger>
          <Button variant="secondary">
            <>
              <IconFilter stroke={1.5} className="icon" />
              {t("common:filters")}
            </>
          </Button>
          <Popover className="p-4">
            <GridList>
              <Item>
                <Switch
                  onChange={toggleActivesOnly}
                  isSelected={activesOnly}
                  size="small"
                >
                  {t("common:actives_only")}
                </Switch>
              </Item>
            </GridList>
          </Popover>
        </MenuTrigger> */}
      </div>
    </div>
  )
}

export default FiltersBar
