"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideAlertOctagon } from "lucide-react"
import { signIn } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

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
import { Input } from "@core/components/ui/input"

import signLogo from "@/assets/sign.svg"

const SigninForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const searchParams = useSearchParams()
  z.setErrorMap(zodI18nMap)

  const SigninFormSchema = z
    .object({
      username: z
        .string()
        .min(1, { message: t("zod:errors.invalid_type_received_undefined") }),
      password: z
        .string()
        .min(1, { message: t("zod:errors.invalid_type_received_undefined") })
    })
    .required()
  type SigninFormType = TypeOf<typeof SigninFormSchema>

  const form = useForm<SigninFormType>({
    resolver: zodResolver(SigninFormSchema)
  })

  function onSubmit(data: SigninFormType) {
    setLoading(true)
    const { username, password } = data
    signIn("credentials", {
      username,
      password,
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        setLoading(false)
        setError(callback.error)
      }
      if (callback?.ok && !callback?.error) {
        router.push(searchParams.get("callbackUrl") || "/admin")
      }
    })
  }

  //   useEffect(() => {
  //     if (session?.status === "authenticated") {
  //       redirect(searchParams.get("callbackUrl") || "/admin")
  //     }
  //   })

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-xs flex-col gap-8 py-12">
        <Image
          src={signLogo}
          alt={process.env.NEXT_PUBLIC_TITLE as string}
          className="ml-auto h-12"
        />
        <h1 className="text-xl font-bold text-gray-800">{t("common:login")}</h1>

        {error && (
          <Alert variant="danger">
            <LucideAlertOctagon />
            <AlertTitle>خطا</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:username")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("common:username")}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("common:password")}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              block
              disabled={loading || form.formState.isSubmitting}
              loading={loading || form.formState.isSubmitting}
            >
              {t("common:login")}
            </Button>
          </form>
        </Form>
        <Link
          href="/auth/reset"
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {t("common:forgot_your_password")}
        </Link>
        <Link
          href="/auth/signup"
          className="text-center font-medium text-blue-500 hover:text-blue-700"
        >
          {t("common:dont_have_an_account")}
        </Link>
      </div>
    </div>
  )
}

export default SigninForm
