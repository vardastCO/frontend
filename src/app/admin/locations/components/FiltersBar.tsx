import { useContext } from "react"
import { LucideFilter } from "lucide-react"
import useTranslation from "next-translate/useTranslation"

import { Button } from "@core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@core/components/ui/dropdown-menu"
import { Label } from "@core/components/ui/label"
import { Switch } from "@core/components/ui/switch"

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
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <LucideFilter className="icon" />
              <span>{t("common:filters")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault
              }}
              asChild
            >
              <Label noStyle className="flex items-center">
                <>
                  <Switch
                    onCheckedChange={toggleActivesOnly}
                    checked={activesOnly}
                    size="small"
                  />
                  <span>{t("common:is_active")}</span>
                </>
              </Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <MenuTrigger>
          <Button variant="secondary">
            <>
              <IconFilter strokeWidth ={1.5} className="icon" />
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
