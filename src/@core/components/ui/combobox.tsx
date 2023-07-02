import { IconCheck, IconSelector } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { ControllerRenderProps } from "react-hook-form"

import { mergeClasses } from "@core/utils/mergeClasses"

import { FormControl } from "../react-hook-form/form"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface ComboBoxProps extends ControllerRenderProps {
  items: { [k: string]: any }[]
  filterKey: string
  labelKey: string
  triggerPlaceholder?: string
  searchPlaceholder?: string
  noResultText?: string
}

const ComboBox = ({
  items,
  filterKey,
  labelKey,
  onChange,
  triggerPlaceholder,
  searchPlaceholder,
  noResultText,
  ...props
}: ComboBoxProps) => {
  const { t } = useTranslation()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            noStyle
            role="combobox"
            className="input-field flex items-center text-start"
          >
            {props.value
              ? items.find((item) => item[filterKey] === props.value)?.[
                  labelKey
                ]
              : triggerPlaceholder ?? t("common:select_placeholder")}
            <IconSelector className="ms-auto h-4 w-4 shrink-0 text-gray-500" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || t("common:search")} />
          <CommandEmpty>{noResultText || t("common:no_result")}</CommandEmpty>
          <CommandGroup className="max-h-[100px] overflow-auto">
            {items.map((item) => (
              <CommandItem
                value={item[filterKey]}
                key={item[filterKey]}
                onSelect={onChange}
              >
                <IconCheck
                  className={mergeClasses(
                    "mr-2 h-4 w-4",
                    item[filterKey] === props.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item[labelKey]}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
ComboBox.displayName = "ComboBox"

export { ComboBox }
