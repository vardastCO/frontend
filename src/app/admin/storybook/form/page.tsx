"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { IconBellDollar } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import zodI18nMap from "@core/utils/zodErrorMap"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@core/components/react-hook-form/form"
import { Input } from "@core/components/ui/input"

const StorybookFormPage = () => {
  z.setErrorMap(zodI18nMap)
  const CreateBrandSchema = z.object({
    name: z.string()
  })
  type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {}
  })

  function onSubmit(data: CreateBrandType) {
    const { name } = data
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl size="xsmall">
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl size="small">
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl prefixAddon={<IconBellDollar />}>
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl
                  size="medium"
                  prefixElement={<span>آدرس را وارد کنید:</span>}
                >
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl size="large">
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl size="xlarge">
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}

export default StorybookFormPage
