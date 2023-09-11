"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon, LucideTrash, LucideWarehouse } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  Brand,
  useCreateBrandMutation,
  useUpdateBrandMutation
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
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import { Textarea } from "@core/components/ui/textarea"
import { useToast } from "@core/hooks/use-toast"
import { uploadPaths } from "@core/lib/uploadPaths"

type BrandFormProps = {
  brand?: Brand
}

const BrandForm = ({ brand }: BrandFormProps) => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { toast } = useToast()
  const router = useRouter()
  const [errors, setErrors] = useState<ClientError>()
  const logoFileFieldRef = useRef<HTMLInputElement>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")

  const token = session?.accessToken || null

  const createBrandMutation = useCreateBrandMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      toast({
        description: t("common:entity_added_successfully", {
          entity: t("common:producer")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/brands")
    }
  })
  const updateBrandMutation = useUpdateBrandMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: () => {
      toast({
        description: t("common:entity_updated_successfully", {
          entity: t("common:producer")
        }),
        duration: 2000,
        variant: "success"
      })
      router.push("/admin/brands")
    }
  })

  z.setErrorMap(zodI18nMap)
  const CreateBrandSchema = z.object({
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
  type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  const form = useForm<CreateBrandType>({
    resolver: zodResolver(CreateBrandSchema),
    defaultValues: {
      name: brand?.name,
      slug: brand?.slug,
      logoFileUuid: brand?.logoFile?.uuid
    }
  })

  const name = form.watch("name")

  const onLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileToUpload = event.target.files[0]
      const formData = new FormData()
      formData.append("directoryPath", uploadPaths.brandLogo)
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

  function onSubmit(data: CreateBrandType) {
    const { name, slug, logoFileUuid } = data

    if (brand?.name) {
      updateBrandMutation.mutate({
        updateBrandInput: {
          id: brand.id,
          name,
          slug,
          logoFileUuid
        }
      })
    } else {
      createBrandMutation.mutate({
        createBrandInput: {
          name,
          slug,
          logoFileUuid
        }
      })
    }
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
          <h1 className="text-xl font-black text-gray-800 lg:text-3xl">
            {name
              ? name
              : t("common:new_entity", { entity: t("common:producer") })}
          </h1>
          <Button
            className="sticky top-0"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            {t("common:save_entity", { entity: t("common:producer") })}
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <Card template="1/2" title={t("common:title")}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                {logoPreview || brand?.logoFile ? (
                  <Image
                    src={
                      logoPreview ||
                      (brand?.logoFile?.presignedUrl.url as string)
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
                  {logoFile
                    ? logoFile.name
                    : t("common:choose_entity_file", {
                        entity: t("common:logo")
                      })}
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

export default BrandForm
