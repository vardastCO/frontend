"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Permission,
  Role,
  useGetAllPermissionsQuery,
  useGetAllRolesQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import zodI18nMap from "@core/utils/zodErrorMap"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import { Checkbox } from "@core/components/ui/checkbox"

interface UserPermissionsFormType {
  userRoles: Role[]
  userPermissions: Permission[]
}

const UserPermissionsForm = ({
  userRoles,
  userPermissions
}: UserPermissionsFormType) => {
  const { t } = useTranslation()
  const { data: roles } = useGetAllRolesQuery(graphqlRequestClient)
  const { data: permissions } = useGetAllPermissionsQuery(graphqlRequestClient)

  const currentUserRoles: string[] = userRoles.reduce<string[]>((acc, item) => {
    acc.push(item.name)
    return acc
  }, [])

  const currentUserPermissions: string[] = userPermissions.reduce<string[]>(
    (acc, item) => {
      acc.push(item.name)
      return acc
    },
    []
  )
  z.setErrorMap(zodI18nMap)
  const UserPermissionsSchema = z.object({
    roles: z.array(z.string()),
    permissions: z.array(z.string())
  })
  type UserPermissionsType = TypeOf<typeof UserPermissionsSchema>
  const form = useForm<UserPermissionsType>({
    resolver: zodResolver(UserPermissionsSchema),
    defaultValues: {
      roles: currentUserRoles,
      permissions: currentUserPermissions
    }
  })
  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-8">
          {roles && (
            <div className="card flex items-start rounded p-4">
              <div className="w-1/3">
                <h2 className="font-medium text-gray-800">
                  {t("common:roles")}
                </h2>
              </div>
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="roles"
                  render={() => (
                    <FormItem>
                      {roles.roles.data.map(
                        (item) =>
                          item && (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="roles"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="checkbox-field"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.name
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.name
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel>{item.displayName}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          )
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {permissions && (
            <div className="card flex items-start rounded p-4">
              <div className="w-1/3">
                <h2 className="font-medium text-gray-800">
                  {t("common:permissions")}
                </h2>
              </div>
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      {permissions.permissions.data.map(
                        (item) =>
                          item && (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="checkbox-field"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.name
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.name
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel>{item.displayName}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          )
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

export default UserPermissionsForm
