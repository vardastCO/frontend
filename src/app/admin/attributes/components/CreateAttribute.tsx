"use client"

import { Item } from "@core/components/Collection"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Popover } from "@core/components/Popover"
import { Select } from "@core/components/Select"
import { Switch } from "@core/components/Switch"
import { TextField } from "@core/components/TextField"
import useTranslation from "next-translate/useTranslation"

const CreateAttribute = () => {
  const { t } = useTranslation()

  return (
    <div>
      <form>
        <div className="flex flex-col gap-6">
          <TextField label={t("common:name")}>
            <Input />
          </TextField>
          <TextField label={t("common:id")}>
            <Input />
          </TextField>
          <Select label={t("common:type")}>
            <Popover>
              <ListBox>
                <Item>Text</Item>
                <Item>Textarea</Item>
                <Item>Select</Item>
                <Item>Checkbox</Item>
                <Item>Radio</Item>
                <Item>Image</Item>
                <Item>File</Item>
                <Item>Number</Item>
                <Item>Currency</Item>
              </ListBox>
            </Popover>
          </Select>
          <Switch>{t("common:visible")}</Switch>
          <Switch>{t("common:filterable")}</Switch>
          <Switch>{t("common:required")}</Switch>
        </div>
      </form>
    </div>
  )
}

export default CreateAttribute
