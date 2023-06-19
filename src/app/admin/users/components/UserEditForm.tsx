import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconCheck, IconSelector } from "@tabler/icons-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { useGetAllCountriesQuery, User } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { mergeClasses } from "@core/utils/mergeClasses"
import { timezones } from "@core/utils/timezones"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
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

const UserEditForm = ({ user }: Props) => {
  const { t } = useTranslation()
  const [countryId, setCountryId] = useState<string | null>(null)
  const [timezone, setTimezone] = useState<string | null>(null)

  const {
    isLoading,
    error,
    data: countries
  } = useGetAllCountriesQuery(graphqlRequestClient)

  const UserEditFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional(),
    cellphone: z.string().optional(),
    country: z.string(),
    timezone: z.string(),
    newPassword: z.string(),
    repeatPassword: z.string(),
    currentPassword: z.string()
  })
  type UserEditForm = TypeOf<typeof UserEditFormSchema>

  const form = useForm<UserEditForm>({
    resolver: zodResolver(UserEditFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email as string,
      cellphone: user.cellphone as string,
      country: user.country.slug,
      timezone: user.timezone
    }
  })

  function onSubmit(data: UserEditForm) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-8">
          <div className="card flex items-start rounded p-4">
            <div className="w-1/3">
              <h2 className="font-medium text-gray-800">
                {t("common:personal_information")}
              </h2>
            </div>
            <div className="w-2/3">
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
            </div>
          </div>
          <div className="card flex items-start rounded p-4">
            <div className="w-1/3">
              <h2 className="font-medium text-gray-800">
                {t("common:settings")}
              </h2>
            </div>
            <div className="w-2/3">
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
                                ? countries?.countries.find(
                                    (country) => country.slug === field.value
                                  )?.name
                                : "Select language"}
                              <IconSelector className="ms-auto h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup className="max-h-[100px] overflow-auto">
                              {countries?.countries.map((country) => (
                                <CommandItem
                                  value={country.slug}
                                  key={country.id}
                                  onSelect={(value) => {
                                    form.setValue("country", value)
                                  }}
                                >
                                  <IconCheck
                                    className={mergeClasses(
                                      "mr-2 h-4 w-4",
                                      country.slug === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {country.name}
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
                                    (timezon) => timezon.title === field.value
                                  )?.title
                                : "Select language"}
                              <IconSelector className="ms-auto h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {timezones.map((timezone) => (
                                <CommandItem
                                  value={timezone.title}
                                  key={timezone.id}
                                  onSelect={(value) => {
                                    form.setValue("timezone", value)
                                  }}
                                >
                                  <IconCheck
                                    className={mergeClasses(
                                      "mr-2 h-4 w-4",
                                      timezone.title === field.value
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
            </div>
          </div>
          <div className="card flex items-start rounded p-4">
            <div className="w-1/3">
              <h2 className="font-medium text-gray-800">
                {t("common:password")}
              </h2>
            </div>
            <div className="w-2/3">
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
            </div>
          </div>

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

export default UserEditForm
