import { Country, User, useGetAllCountriesQuery } from "@/generated"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/Button"
import { Item } from "@core/components/Collection"
import { ComboBox } from "@core/components/ComboBox"
import { Input } from "@core/components/Input"
import { ListBox } from "@core/components/ListBox"
import { Popover } from "@core/components/Popover"
import { TextField } from "@core/components/TextField"
import { timezones, type Timezone } from "@core/utils/timezones"
import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { Key, useState } from "react"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

type Props = {
  user: User
}

const UserEditForm = ({ user }: Props) => {
  const { t } = useTranslation()
  const [countryId, setCountryId] = useState<Key | null>(null)
  const [timezone, setTimezone] = useState<Key | null>(null)

  const {
    isLoading,
    error,
    data: countries
  } = useGetAllCountriesQuery(graphqlRequestClient)

  const UserEditFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    cellphone: z.string(),
    country: z.number(),
    timezone: z.string(),
    newPassword: z.string(),
    repeatPassword: z.string(),
    currentPassword: z.string()
  })
  type UserEditForm = TypeOf<typeof UserEditFormSchema>

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserEditForm>({
    resolver: zodResolver(UserEditFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cellphone: user.cellphone,
      country: user.country.id,
      timezone: user.timezone
    }
  })

  function onSubmit(data: UserEditForm) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-8">
        <div className="card flex items-start rounded p-4">
          <div className="w-1/3">
            <h2 className="font-medium text-gray-800">
              {t("common:personal_information")}
            </h2>
          </div>
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-6">
              <TextField label={t("common:first_name")}>
                <Input {...register("firstName")} />
              </TextField>
              <TextField label={t("common:last_name")}>
                <Input {...register("lastName")} />
              </TextField>
              <TextField label={t("common:email")} className="col-span-2">
                <Input {...register("email")} />
              </TextField>
              <TextField label={t("common:cellphone")} className="col-span-2">
                <Input {...register("cellphone")} />
              </TextField>
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
              <ComboBox
                label={t("common:country")}
                onSelectionChange={setCountryId}
                selectedKey={user.country.id}
                isDisabled={isSubmitting}
              >
                <Popover>
                  <ListBox items={countries?.countries as Country[]}>
                    {(item) => (
                      <Item id={item.id} textValue={item.name}>
                        {item.name}
                      </Item>
                    )}
                  </ListBox>
                </Popover>
              </ComboBox>
              <ComboBox
                label={t("common:timezone")}
                onSelectionChange={setTimezone}
                selectedKey={
                  timezones.find((item) => item.title === user.timezone)?.id
                }
                isDisabled={isSubmitting}
              >
                <Popover>
                  <ListBox items={timezones as Timezone[]}>
                    {(item) => <Item id={item.id}>{item.title}</Item>}
                  </ListBox>
                </Popover>
              </ComboBox>
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
              <TextField label={t("common:new_password")} type="password">
                <Input {...register("newPassword")} />
              </TextField>
              <TextField label={t("common:repeat_password")} type="password">
                <Input {...register("repeatPassword")} />
              </TextField>
              <TextField label={t("common:current_password")} type="password">
                <Input {...register("currentPassword")} />
              </TextField>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" isDisabled={isSubmitting}>
            {t("common:submit")}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default UserEditForm
