import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { GridList } from "@core/components/GridList"
import { MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Switch } from "@core/components/Switch"
import { IconFilter } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { useContext } from "react"
import { LocationsContext } from "./LocationsProvider"

type Props = {}

const FiltersBar = (props: Props) => {
  const { t } = useTranslation()
  const { activesOnly, setActivesOnly, toggleActivesOnly } =
    useContext(LocationsContext)
  return (
    <div className="mb-6 flex items-center">
      <div className="mr-auto">
        <MenuTrigger>
          <Button intent="secondary">
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
        </MenuTrigger>
      </div>
    </div>
  )
}

export default FiltersBar
