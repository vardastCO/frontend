"use client"

import { Key, useContext, useState } from "react"
import Link from "next/link"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"
import { Province, useUpdateProvinceMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Item } from "@core/components/Collection"
import { Menu, MenuTrigger } from "@core/components/Menu"
import { Popover } from "@core/components/Popover"
import { Separator } from "@core/components/Separator"
import { Switch } from "@core/components/Switch"
import { Button } from "@core/components/ui/button"
import { useToast } from "@core/hooks/use-toast"

import { LocationsContext } from "./LocationsProvider"

interface ProvinceCardProps {
  show: boolean
  countrySlug: string
  province: Province
}

const ProvinceCard = ({ show, countrySlug, province }: ProvinceCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { toast } = useToast()
  const { name, slug, isActive, citiesCount } = province
  const [active, setActive] = useState(isActive)

  const updateProvinceMutation = useUpdateProvinceMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        toast({
          description: t("common:entity_updated_successfully", {
            entity: t("common:province")
          }),
          duration: 2000,
          variant: "success"
        })
        setActive((value) => !value)
      }
    }
  )

  const toggleActive = () => {
    const oldActiveMode = active
    updateProvinceMutation.mutate({
      updateProvinceInput: {
        id: province.id,
        isActive: !oldActiveMode
      }
    })
  }

  const onAction = (key: Key) => {
    switch (key) {
      case "remove":
        setEntityToRemove({
          type: "province",
          entity: province
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
      <Link
        href={`/admin/locations/country/${countrySlug}/province/${slug}`}
        className="font-bold text-gray-800 underline-offset-2 hover:text-gray-900 hover:underline"
      >
        {name}
      </Link>
      {citiesCount !== 0 && (
        <span className="text-sm text-gray-500">
          {digitsEnToFa(citiesCount)} شهر
        </span>
      )}
      <div className="mr-auto flex items-center gap-2">
        <Switch
          onChange={toggleActive}
          isSelected={active}
          size="small"
          isDisabled={updateProvinceMutation.isLoading}
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

export default ProvinceCard
