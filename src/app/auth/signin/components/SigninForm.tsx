"use client"

import { Button } from "@core/components/Button"
import { Input } from "@core/components/Input"
import { TextField } from "@core/components/TextField"
import zodI18nMap from "@core/utils/zodErrorMap"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

const SigninForm = () => {
  const { t } = useTranslation()
  const session = useSession()
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninFormType>({
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

  useEffect(() => {
    if (session?.status === "authenticated") {
      redirect(searchParams.get("callbackUrl") || "/admin")
    }
  })

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-xs flex-col gap-8">
        <h1 className="text-xl font-bold text-gray-800">{t("common:login")}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          {error && <div className="message">{error}</div>}
          <TextField
            label={t("common:username")}
            placeholder={t("common:username")}
            isDisabled={loading || isSubmitting}
            errorMessage={errors.username && errors.username.message}
          >
            <Input {...register("username")} />
          </TextField>
          <TextField
            label={t("common:password")}
            type="password"
            placeholder={t("common:password")}
            isDisabled={loading || isSubmitting}
            errorMessage={errors.password && errors.password.message}
          >
            <Input type="password" {...register("password")} />
          </TextField>
          <Button
            type="submit"
            fullWidth
            isDisabled={loading || isSubmitting}
            loading={loading || isSubmitting}
          >
            {t("common:login")}
          </Button>
        </form>
        <Link
          href="/auth/reset"
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {t("common:forgot_your_password")}
        </Link>
      </div>
    </div>
  )
}

export default SigninForm
