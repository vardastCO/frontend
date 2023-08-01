"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideTrash, LucideWarehouse } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Seller,
  useCreateSellerMutation,
  useUpdateSellerMutation
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
import Card from "@core/components/shared/Card"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import { Textarea } from "@core/components/ui/textarea"
import { useToast } from "@core/hooks/use-toast"
import { uploadPaths } from "@core/lib/uploadPaths"

type SellerFormProps = {
  seller?: Seller
}

const SellerForm = ({ seller }: SellerFormProps) => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const logoFileFieldRef = useRef<HTMLInputElement>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")

  const token = session?.accessToken || null

  const createSellerMutation = useCreateSellerMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:seller")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/sellers")
    }
  })
  const updateSellerMutation = useUpdateSellerMutation(graphqlRequestClient, {
    onSuccess: () => {
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:seller")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/sellers")
    }
  })

  z.setErrorMap(zodI18nMap)
  const CreateSellerSchema = z.object({
    name: z.string(),
    slug: z.string(),
    email: z.string().email().optional(),
    logoFileUuid: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    about: z.string().optional(),
    social: z.string().optional()
  })
  type CreateSellerType = TypeOf<typeof CreateSellerSchema>

  const form = useForm<CreateSellerType>({
    resolver: zodResolver(CreateSellerSchema),
    defaultValues: {
      name: seller?.name,
      slug: seller?.slug,
      logoFileUuid: seller?.logoFile?.uuid
    }
  })

  const name = form.watch("name")

  const onLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileToUpload = event.target.files[0]
      const formData = new FormData()
      formData.append("directoryPath", uploadPaths.sellerLogo)
      formData.append("file", fileToUpload)
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/base/storage/file`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`
        },
        body: formData
      }).then(async (response) => {
        if (!response.ok) {
        }

        const uploadResult = await response.json()
        form.setValue("logoFileUuid", uploadResult.uuid)

        setLogoFile(fileToUpload)
        setLogoPreview(URL.createObjectURL(fileToUpload))
      })
    }
  }

  function onSubmit(data: CreateSellerType) {
    const { name, slug, logoFileUuid, email, phone, address, website, about } =
      data

    if (seller?.name) {
      updateSellerMutation.mutate({
        updateSellerInput: {
          id: seller.id,
          name,
          slug,
          logoFileUuid
        }
      })
    } else {
      createSellerMutation.mutate({
        createSellerInput: {
          name,
          slug,
          logoFileUuid
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 mt-8 flex items-end justify-between">
          <h1 className="text-3xl font-black text-gray-800">
            {name
              ? name
              : t("common:new_entity", { entity: t("common:seller") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:seller") })}
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <Card template="1/2" title={t("common:title")}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:name")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:slug")}</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card template="1/2" title={t("common:logo")}>
            <div className="flex items-end gap-6">
              <Input
                type="file"
                onChange={(e) => onLogoFileChange(e)}
                className="hidden"
                accept="image/*"
                ref={logoFileFieldRef}
              />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-md border border-gray-200">
                {logoPreview || seller?.logoFile ? (
                  <Image
                    src={
                      logoPreview ||
                      (seller?.logoFile?.presignedUrl.url as string)
                    }
                    fill
                    alt="..."
                    className="object-contain p-3"
                  />
                ) : (
                  <LucideWarehouse
                    className="h-8 w-8 text-gray-400"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    logoFileFieldRef.current?.click()
                  }}
                >
                  {logoFile ? logoFile.name : "انتخاب فایل لوگو"}
                </Button>
                {logoPreview && (
                  <Button
                    variant="danger"
                    iconOnly
                    onClick={() => {
                      form.setValue("logoFileUuid", "")
                      setLogoFile(null)
                      setLogoPreview("")
                    }}
                  >
                    <LucideTrash className="icon" />
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card template="1/2" title={t("common:about")}>
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:about")}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </div>
      </form>
    </Form>
  )
}

export default SellerForm
