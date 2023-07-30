import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideCheck, LucideChevronsUpDown } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { useGetAllCountriesQuery, User } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import { timezones } from "@core/utils/timezones"
import zodI18nMap from "@core/utils/zodErrorMap"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import Card from "@core/components/shared/Card"
import { Button } from "@core/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@core/components/ui/command"
import { Input } from "@core/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"

type Props = {
  user: User
}

const UserForm = ({ user }: Props) => {
  const { t } = useTranslation()
  const [countryId, setCountryId] = useState<string | null>(null)
  const [timezone, setTimezone] = useState<string | null>(null)

  const {
    isLoading,
    error,
    data: countries
  } = useGetAllCountriesQuery(graphqlRequestClient)

  z.setErrorMap(zodI18nMap)
  const UserEditFormSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email().optional().or(z.literal("")),
      cellphone: z.string().optional(),
      country: z.string(),
      timezone: z.string(),
      newPassword: z.string().optional(),
      repeatPassword: z.string().optional(),
      currentPassword: z.string().optional()
    })
    .refine((schema) => (schema.newPassword ? !!schema.repeatPassword : true), {
      path: ["repeatPassword"],
      message: t("zod:errors.invalid_type_received_undefined")
    })
    .refine(
      (schema) => (schema.newPassword ? !!schema.currentPassword : true),
      {
        path: ["currentPassword"],
        message: t("zod:errors.invalid_type_received_undefined")
      }
    )
    .refine((schema) => schema.newPassword === schema.repeatPassword, {
      path: ["repeatPassword"],
      message: t("zod:errors.invalid_type_received_undefined")
    })
  type UserEditForm = TypeOf<typeof UserEditFormSchema>

  const form = useForm<UserEditForm>({
    resolver: zodResolver(UserEditFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email || "",
      cellphone: user.cellphone as string,
      country: user.country.slug,
      timezone: user.timezone.toLowerCase()
    }
  })

  function onSubmit(data: UserEditForm) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-8">
          <Card template="1/2" title={t("common:personal_information")}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:first_name")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:last_name")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>{t("common:email")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cellphone"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>{t("common:cellphone")}</FormLabel>
                    <FormControl>
                      <Input type="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card template="1/2" title={t("common:settings")}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:country")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? countries?.countries.data.find(
                                  (country) =>
                                    country && country.slug === field.value
                                )?.name
                              : t("common:choose_entity", {
                                  entity: t("common:country")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:country")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:country")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {countries?.countries.data.map(
                              (country) =>
                                country && (
                                  <CommandItem
                                    value={country.slug}
                                    key={country.id}
                                    onSelect={(value) => {
                                      form.setValue("country", value)
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        country.slug === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {country.name}
                                  </CommandItem>
                                )
                            )}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:timezone")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? timezones.find(
                                  (timezon) =>
                                    timezon.title.toLowerCase() === field.value
                                )?.title
                              : t("common:choose_entity", {
                                  entity: t("common:timezone")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:timezone")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:timezone")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {timezones.map((timezone) => (
                              <CommandItem
                                value={timezone.title}
                                key={timezone.id}
                                onSelect={(value) => {
                                  form.setValue("timezone", value)
                                }}
                              >
                                <LucideCheck
                                  className={mergeClasses(
                                    "mr-2 h-4 w-4",
                                    timezone.title.toLowerCase() === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {timezone.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
          <Card template="1/2" title={t("common:password")}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:new_password")}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:repeat_password")}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:current_password")}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {t("common:submit")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
