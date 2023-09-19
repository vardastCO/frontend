"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import { enumToKeyValueObject } from "@core/utils/enumToKeyValueObject"
import { persianInputSchema } from "@core/utils/zodValidationSchemas"
import Dropzone, { FilesWithPreview } from "@core/components/Dropzone"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@core/components/ui/select"
import { Textarea } from "@core/components/ui/textarea"

// eslint-disable-next-line no-unused-vars
enum TopicEnum {
  // eslint-disable-next-line no-unused-vars
  BUG = "BUG",
  // eslint-disable-next-line no-unused-vars
  SALE = "SALE"
}

const formSchema = z.object({
  topic: persianInputSchema,
  username: persianInputSchema,
  email: persianInputSchema,
  cellphone: persianInputSchema,
  orderId: persianInputSchema,
  message: persianInputSchema
})

const topicEnum = enumToKeyValueObject(TopicEnum)

type FormType = TypeOf<typeof formSchema>

const ContactForm = () => {
  const { t } = useTranslation()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema)
  })

  function onSubmitStepOne(data: FormType) {
    console.log("submit", data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitStepOne)}
        noValidate
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common:topic")}</FormLabel>
              <Select
                onValueChange={(value) => {
                  form.setValue("topic", value as TopicEnum)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("common:select_placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(topicEnum).map((type) => (
                    <SelectItem value={topicEnum[type]} key={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common:username")}</FormLabel>
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
            <FormItem>
              <FormLabel>{t("common:email")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cellphone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common:cellphone")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common:orderId")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common:message")}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Dropzone
          existingImages={undefined}
          uploadPath={""}
          onAddition={function (_: FilesWithPreview): void {
            throw new Error("Function not implemented.")
          }}
          onDelete={function (_: FilesWithPreview): void {
            throw new Error("Function not implemented.")
          }}
          // existingImages={product && product.images}
          // uploadPath={uploadPaths.productImages}
          // onAddition={(file) => {
          //   setImages((prevImages) => [
          //     ...prevImages,
          //     {
          //       uuid: file.uuid as string,
          //       expiresAt: file.expiresAt as string
          //     }
          //   ])
          // }}
          // onDelete={(file) => {
          //   setImages((images) =>
          //     images.filter((image) => image.uuid !== file.uuid)
          //   )
          // }}
        />
        <Button type="submit" block>
          ثبت و ارسال
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
