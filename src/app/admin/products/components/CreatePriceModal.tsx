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
  PriceTypesEnum,
  useCreatePriceMutation,
  useGetSellersWithoutPaginationQuery
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
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
import { Switch } from "@core/components/ui/switch"
import { toast } from "@core/hooks/use-toast"

type CreatePriceModalProps = {
  productId: number
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const CreatePriceModal = ({
  open,
  onOpenChange,
  productId
}: CreatePriceModalProps) => {
  const { t } = useTranslation()
  const [sellerOpen, setSellerOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<ClientError>()

  const queryClient = useQueryClient()
  const createPriceMutation = useCreatePriceMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries({
        queryKey: ["GetProduct", { id: productId }]
      })
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:price")
        }),
        duration: 2000,
        variant: "success"
      })
      onOpenChange(false)
    }
  })
  const sellers = useGetSellersWithoutPaginationQuery(graphqlRequestClient)

  const CreatePriceSchema = z.object({
    amount: z.number(),
    sellerId: z.number(),
    isPublic: z.boolean().optional().default(true)
  })
  type CreatePrice = TypeOf<typeof CreatePriceSchema>

  const form = useForm<CreatePrice>({
    resolver: zodResolver(CreatePriceSchema),
    defaultValues: {
      isPublic: true
    }
  })

  const onClose = () => {
    form.reset()
    onOpenChange(false)
  }

  function onSubmit(data: CreatePrice) {
    const { isPublic, amount, sellerId } = data

    createPriceMutation.mutate({
      createPriceInput: {
        productId,
        sellerId,
        amount,
        type: PriceTypesEnum.Consumer,
        isPublic
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("common:add_entity", {
              entity: t("common:price")
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
                name="sellerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:seller")}</FormLabel>
                    <Popover open={sellerOpen} onOpenChange={setSellerOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={sellers.isLoading || sellers.isError}
                            noStyle
                            role="combobox"
                            className="input-field flex items-center text-start"
                          >
                            {field.value
                              ? sellers.data?.sellersWithoutPagination.find(
                                  (seller) =>
                                    seller && seller.id === field.value
                                )?.name
                              : t("common:choose_entity", {
                                  entity: t("common:seller")
                                })}
                            <LucideChevronsUpDown className="ms-auto h-4 w-4 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-[9999]">
                        <Command>
                          <CommandInput
                            placeholder={t("common:search_entity", {
                              entity: t("common:seller")
                            })}
                          />
                          <CommandEmpty>
                            {t("common:no_entity_found", {
                              entity: t("common:seller")
                            })}
                          </CommandEmpty>
                          <CommandGroup>
                            {sellers.data?.sellersWithoutPagination.map(
                              (seller) =>
                                seller && (
                                  <CommandItem
                                    value={seller.name}
                                    key={seller.id}
                                    onSelect={(value) => {
                                      form.setValue(
                                        "sellerId",
                                        sellers.data?.sellersWithoutPagination.find(
                                          (item) =>
                                            item &&
                                            item.name.toLowerCase() === value
                                        )?.id || 0
                                      )
                                      setSellerOpen(false)
                                    }}
                                  >
                                    <LucideCheck
                                      className={mergeClasses(
                                        "mr-2 h-4 w-4",
                                        seller.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {seller.name}
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:amount")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel noStyle>{t("common:public")}</FormLabel>
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

export default CreatePriceModal
