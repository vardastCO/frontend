"use client"

import { Button } from "@core/components/Button"
import { Input } from "@core/components/Input"
import { TextField } from "@core/components/TextField"
import zodI18nMap from "@core/utils/zodErrorMap"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

z.setErrorMap(zodI18nMap)

const SigninFormSchema = z
  .object({
    username: z.string(),
    password: z.string()
  })
  .required()
type SigninForm = z.infer<typeof SigninFormSchema>

const SigninForm = () => {
  const searchParams = useSearchParams()

  const { t } = useTranslation()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninFormSchema)
  })

  const onSubmit = (data: SigninForm) => {
    const { username, password } = data
    signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: searchParams.get("callbackUrl") || "/admin"
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <TextField
        label={t("common:username")}
        placeholder={t("common:username")}
        errorMessage={errors.username && errors.username.message}
      >
        <Input {...register("username")} />
      </TextField>
      <TextField
        label={t("common:password")}
        type="password"
        placeholder={t("common:password")}
        errorMessage={errors.password && errors.password.message}
      >
        <Input type="password" {...register("password")} />
      </TextField>
      <Button type="submit" fullWidth>
        {t("common:login")}
      </Button>
    </form>
  )
}

export default SigninForm
