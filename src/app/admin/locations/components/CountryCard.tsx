"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import useTranslation from "next-translate/useTranslation"

import { Country, useUpdateCountryMutation } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { getFlagEmoji } from "@core/utils/getFlagEmoji"
import { Button } from "@core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@core/components/ui/dropdown-menu"
import { Label } from "@core/components/ui/label"
import { Switch } from "@core/components/ui/switch"
import { useToast } from "@core/hooks/use-toast"

import { LocationsContext } from "./LocationsProvider"

type CountryCardProps = {
  show: boolean
  country: Country
}

const CountryCard = ({ show, country }: CountryCardProps) => {
  const { removeStateAtom, entityToRemoveAtom } = useContext(LocationsContext)
  const setEntityToRemove = useSetAtom(entityToRemoveAtom)
  const setRemoveState = useSetAtom(removeStateAtom)
  const { t } = useTranslation()
  const { toast } = useToast()
  const { name, slug, alphaTwo, isActive, provincesCount } = country
  const [active, setActive] = useState(isActive)

  const updateCountryMutation = useUpdateCountryMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:country")
        }),
        duration: 2000,
        variant: "success"
      })
      setActive((value) => !value)
    }
  })

  const toggleActive = () => {
    const oldActiveMode = active
    updateCountryMutation.mutate({
      updateCountryInput: {
        id: country.id,
        isActive: !oldActiveMode
      }
    })
  }

  const toggleRemoveItem = () => {
    setEntityToRemove({
      type: "country",
      entity: country
    })
    setRemoveState(true)
  }

  return (
    <div
      className={clsx([
        "card flex items-center gap-3 rounded px-4 py-2 pe-2",
        !show && "hidden"
      ])}
    >
      <div className="flex items-center gap-2">
        <span className="align-baseline text-2xl leading-none">
          {getFlagEmoji(alphaTwo)}
        </span>
        <Link
          href={`/admin/locations/country/${slug}`}
          className="font-bold text-gray-800 dark:text-gray-400 underline-offset-2 hover:text-gray-900 dark:hover:text-gray-300 hover:underline"
        >
          {name}
        </Link>
        {provincesCount !== 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-600">
            {digitsEnToFa(provincesCount)} استان
          </span>
        )}
      </div>
      <div className="mr-auto flex items-center gap-2">
        <Label noStyle className="flex items-center">
          <>
            <Switch
              onCheckedChange={toggleActive}
              checked={active}
              size="small"
              disabled={updateCountryMutation.isLoading}
            />
            <span>{t("common:is_active")}</span>
          </>
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" iconOnly>
              <IconDots className="icon" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <IconEdit className="dropdown-menu-item-icon" />
              <span>{t("common:edit")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={toggleRemoveItem}>
              <IconTrash className="dropdown-menu-item-icon" />
              <span>{t("common:delete")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default CountryCard
