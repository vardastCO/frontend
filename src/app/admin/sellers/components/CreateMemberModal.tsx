"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { ClientError } from "graphql-request"
import {
  LucideAlertOctagon,
  LucideCheck,
  LucideChevronsUpDown
} from "lucide-react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  SellerRepresentativeRoles,
  useCreateSellerRepresentativeMutation,
  useGetAllUsersQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { mergeClasses } from "@core/utils/mergeClasses"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@core/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
import { Input } from "@core/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@core/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Switch } from "@core/components/ui/switch"
import { toast } from "@core/hooks/use-toast"

type CreateMemberModalProps = {
  sellerId: number
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const CreateMemberModal = ({
  open,
  onOpenChange,
  sellerId
}: CreateMemberModalProps) => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<ClientError>()
  const roles = enumToKeyValueObject(SellerRepresentativeRoles)

  const queryClient = useQueryClient()
  const createMemberMutation = useCreateSellerRepresentativeMutation(
    graphqlRequestClient,
    {
      onError: (errors: ClientError) => {
        setErrors(errors)
      },
      onSuccess: () => {
        form.reset()
        queryClient.invalidateQueries({
          queryKey: ["GetSeller", { id: sellerId }]
        })
        toast({
          description: t("common:entity_added_successfully", {
            entity: t("common:member")
          }),
          duration: 2000,
          variant: "success"
        })
        onOpenChange(false)
      }
    }
  )
  const users = useGetAllUsersQuery(graphqlRequestClient)

  const CreateMemberSchema = z.object({
    userId: z.number(),
    role: z.nativeEnum(SellerRepresentativeRoles),
    title: z.string().optional(),
    isActive: z.boolean().optional().default(true)
  })
  type CreateMember = TypeOf<typeof CreateMemberSchema>

  const form = useForm<CreateMember>({
    resolver: zodResolver(CreateMemberSchema),
    defaultValues: {
      isActive: true
    }
  })

  const onClose = () => {
    form.reset()
    onOpenChange(false)
  }

  function onSubmit(data: CreateMember) {
    const { userId, role, title, isActive } = data

    createMemberMutation.mutate({
      createSellerRepresentativeInput: {
        sellerId,
        userId,
        role,
        title,
        isActive
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("common:add_entity", {
              entity: t("common:member")
            })}
          </DialogTitle>
        </DialogHeader>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6 py-8">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:user")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={users.isLoading || users.isError}
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? users.data?.users.data.find(
                                  (user) => user && user.id === field.value
                                )?.fullName
                              : t("common:choose_entity", {
                                  entity: t("common:user")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-[9999]">
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:user")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:user")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {users.data?.users.data.map(
                              (user) =>
                                user && (
                                  <CommandItem
                                    value={user.fullName}
                                    key={user.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "userId",
                                        users.data?.users.data.find(
                                          (item) =>
                                            item &&
                                            item.fullName.toLowerCase() ===
                                              value
                                        )?.id || 0
                                      )
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        user.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {user.fullName}
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:role")}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        form.setValue(
                          "role",
                          value as SellerRepresentativeRoles
                        )
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("common:select_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[9999]">
                        {Object.keys(roles).map((type) => (
                          <SelectItem value={roles[type]} key={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:title")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("common:title")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel noStyle>{t("common:is_active")}</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  type="button"
                  disabled={form.formState.isSubmitting}
                  onClick={() => onClose()}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  type="submit"
                  loading={form.formState.isSubmitting}
                  disabled={form.formState.isSubmitting}
                >
                  {t("common:submit")}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMemberModal
