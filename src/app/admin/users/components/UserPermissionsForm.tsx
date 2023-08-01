"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Permission,
  Role,
  useGetAllPermissionsQuery,
  useGetAllRolesQuery,
  useUpdateUserMutation
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
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import { Checkbox } from "@core/components/ui/checkbox"
import { toast } from "@core/hooks/use-toast"

interface UserPermissionsFormType {
  userId: number
  userRoles: Role[]
  userPermissions: Permission[]
}

const UserPermissionsForm = ({
  userId,
  userRoles,
  userPermissions
}: UserPermissionsFormType) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [errors, setErrors] = useState<ClientError>()
  const { data: roles } = useGetAllRolesQuery(graphqlRequestClient)
  const { data: permissions } = useGetAllPermissionsQuery(graphqlRequestClient)

  const updateUserMutation = useUpdateUserMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:user")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/users")
    }
  })

  const currentUserRoles: number[] = userRoles.reduce<number[]>((acc, item) => {
    acc.push(item.id)
    return acc
  }, [])

  const currentUserPermissions: number[] = userPermissions.reduce<number[]>(
    (acc, item) => {
      acc.push(item.id)
      return acc
    },
    []
  )

  z.setErrorMap(zodI18nMap)
  const UserPermissionsSchema = z.object({
    roles: z.array(z.number()),
    permissions: z.array(z.number())
  })
  type UserPermissionsType = TypeOf<typeof UserPermissionsSchema>
  const form = useForm<UserPermissionsType>({
    resolver: zodResolver(UserPermissionsSchema),
    defaultValues: {
      roles: currentUserRoles,
      permissions: currentUserPermissions
    }
  })

  const onSubmit = (data: UserPermissionsType) => {
    const { roles, permissions } = data
    updateUserMutation.mutate({
      updateUserInput: {
        id: userId,
        roleIds: roles,
        permissionIds: permissions
      }
    })
  }

  return (
    <Form {...form}>
      {errors && (
        <Alert variant="danger">
          <LucideAlertOctagon />
          <AlertTitle>خطا</AlertTitle>
          <AlertDescription>
            {(
              errors.response.errors?.at(0)?.extensions
                .displayErrors as string[]
            ).map((error) => (
              <p key={error}>{error}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {t("common:edit_entity", {
              entity: t("common:role_and_permissions")
            })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", {
              entity: t("common:role_and_permissions")
            })}
          </Button>
        </div>
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
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
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
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
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
