"use client"

import useTranslation from "next-translate/useTranslation"
import {
  Permission,
  Role,
  useGetAllPermissionsQuery,
  useGetAllRolesQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Checkbox, CheckboxGroup } from "@core/components/ui/Checkbox"

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

  return (
    <div className="flex flex-col gap-8">
      {roles && (
        <div className="card flex items-start rounded p-4">
          <div className="w-1/3">
            <h2 className="font-medium text-gray-800">{t("common:roles")}</h2>
          </div>
          <div className="w-2/3">
            <CheckboxGroup name="roles" defaultValue={currentUserRoles}>
              {roles.roles.map((role, idx) => (
                <Checkbox
                  key={idx}
                  value={role.name}
                  label={role.displayName}
                ></Checkbox>
              ))}
            </CheckboxGroup>
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
            <CheckboxGroup
              name="permissions"
              defaultValue={currentUserPermissions}
            >
              {permissions.permissions.map((permission, idx) => (
                <Checkbox
                  key={idx}
                  value={permission.name}
                  label={permission.displayName}
                ></Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPermissionsForm
