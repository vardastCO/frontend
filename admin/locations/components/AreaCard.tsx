"use client"

import { Key, useContext, useState } from "react"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { Area, useUpdateAreaMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
import { Switch } from "@core/components/Switch"
import { Button } from "@core/components/ui/button"

import { LocationsContext } from "./LocationsProvider"

interface AreaCardProps {
  show: boolean
  countrySlug?: string
  provinceSlug?: string
  citySlug?: string
  area: Area
}

const AreaCard = ({ show, area }: AreaCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { toast } = useToast()
  const { name, slug, isActive } = area

  const [active, setActive] = useState(isActive)

  const updateAreaMutation = useUpdateAreaMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast(
        t("common:entity_updated_successfully", {
          entity: t("common:area")
        }),
        {
          duration: 2000,
          variant: "success"
        }
      )
      setActive((value) => !value)
    }
  })

  const toggleActive = () => {
    const oldActiveMode = active
    updateAreaMutation.mutate({
      updateAreaInput: {
        id: area.id,
        isActive: !oldActiveMode
      }
    })
  }

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "area",
          entity: area
        })
        setRemoveState(true)
        break
    }
  }

  return (
    <div
      className={clsx([
        "card flex items-center gap-3 rounded bg-white px-4 py-2 pe-2",
        !show && "hidden"
      ])}
    >
      <span>{name}</span>
      <div className="mr-auto flex items-center gap-2">
        <Switch
          onChange={toggleActive}
          isSelected={active}
          size="small"
          isDisabled={updateAreaMutation.isLoading}
        >
          {t("common:is_active")}
        </Switch>
        <MenuTrigger>
          <Button variant="ghost" iconOnly>
            <IconDots className="icon" />
          </Button>
          <Popover>
            <Menu onAction={onAction}>
              <Item id="edit">
                <IconEdit className="dropdown-menu-item-icon" />
                ویرایش
              </Item>
              <Separator />
              <Item id="remove" className="danger">
                <IconTrash className="dropdown-menu-item-icon" />
                حذف
              </Item>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    </div>
  )
}

export default AreaCard
