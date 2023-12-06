"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  useValidateCellphoneMutation,
  useValidateOtpMutation,
  ValidationTypes
} from "@/generated"

import graphqlRequestClientWithoutToken from "@core/clients/graphqlRequestClientWithoutToken"
import zodI18nMap from "@core/utils/zodErrorMap"
import { cellphoneNumberSchema } from "@core/utils/zodValidationSchemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@core/components/react-hook-form/form"
import Link from "@core/components/shared/Link"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import useCountdown from "@core/hooks/use-countdown"

import logoType from "@/assets/logo-type.svg"

type Props = {}

const SigninForm = (_: Props) => {
  const { t } = useTranslation()
  // const session = useSession()
  const router = useRouter()
  // const searchParams = useSearchParams()
  const [formState, setFormState] = useState<number>(1)
  const [validationKey, setValidationKey] = useState<string>("")
  const [errors, setErrors] = useState<ClientError | null>()
  const [loginErrors, setLoginErrors] = useState<string | null>()
  const [message, setMessage] = useState<string>("")
  const [pageLoading, setPageLoading] = useState(false)
  const session = useSession()
  const { secondsLeft, startCountdown } = useCountdown()
  z.setErrorMap(zodI18nMap)

  const validateCellphoneMutation = useValidateCellphoneMutation(
    graphqlRequestClientWithoutToken,
    {
      onError: (errors: ClientError) => {
        setPageLoading(false)
        setErrors(errors)
      },
      onSuccess: (data) => {
        const { nextState, message, remainingSeconds, validationKey } =
          data.validateCellphone
        setErrors(null)
        setLoginErrors(null)

        if (nextState === "LOGIN") {
          router.push("/auth/signin")
        }

        if (nextState === "VALIDATE_OTP") {
          setValidationKey(validationKey as string)
          startCountdown(remainingSeconds as number)
          setMessage(message as string)
          setFormState(2)
        }
      }
    }
  )
  const validateOtpMutation = useValidateOtpMutation(
    graphqlRequestClientWithoutToken,
    {
      onError: (errors: ClientError) => {
        setPageLoading(false)
        setErrors(errors)
      },
      onSuccess: (data) => {
        const { message } = data.validateOtp
        formStepOne.getValues()
        signIn("credentials", {
          cellphone: formStepOne.getValues().cellphone,
          signInType: "otp",
          validationKey,
          redirect: false
        }).then((callback) => {
          if (callback?.error) {
            setLoginErrors(callback?.error)
            setPageLoading(false)
          }
          if (callback?.ok && !callback?.error) {
            router.refresh()
            setErrors(null)
            setLoginErrors(null)
            setMessage(message as string)
            session.update()
            router.push("/")
          }
        })
      }
    }
  )

  const SignupFormStepOneSchema = z.object({
    cellphone: cellphoneNumberSchema
  })
  type SignupFormStepOneType = TypeOf<typeof SignupFormStepOneSchema>

  const formStepOne = useForm<SignupFormStepOneType>({
    resolver: zodResolver(SignupFormStepOneSchema)
  })

  const SignupFormStepTwoSchema = z.object({
    otp: z.string()
  })
  type SignupFormStepTwoType = TypeOf<typeof SignupFormStepTwoSchema>

  const formStepTwo = useForm<SignupFormStepTwoType>({
    resolver: zodResolver(SignupFormStepTwoSchema)
  })

  function onSubmitStepOne(data: SignupFormStepOneType) {
    const { cellphone } = data
    validateCellphoneMutation.mutate({
      ValidateCellphoneInput: {
        countryId: 244,
        cellphone,
        validationType: ValidationTypes.Login
      }
    })
  }
  function onSubmitStepTwo(data: SignupFormStepTwoType) {
    setPageLoading(true)
    const { otp } = data
    validateOtpMutation.mutate({
      ValidateOtpInput: {
        token: otp,
        validationKey,
        validationType: ValidationTypes.Login
      }
    })
  }

  const SigninFormStepZeroSchema = z
    .object({
      username: z
        .string()
        .min(1, { message: t("zod:errors.invalid_type_received_undefined") }),
      password: z
        .string()
        .min(1, { message: t("zod:errors.invalid_type_received_undefined") })
    })
    .required()

  type SignInFormStepZeroType = TypeOf<typeof SigninFormStepZeroSchema>

  const form = useForm<SignInFormStepZeroType>({
    resolver: zodResolver(SigninFormStepZeroSchema)
  })

  function onSubmitStepZero(data: SignInFormStepZeroType) {
    setPageLoading(true)
    const { username, password } = data
    signIn("credentials", {
      username,
      password,
      signInType: "username",
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        setLoginErrors(callback?.error)
        setPageLoading(false)
      }
      if (callback?.ok && !callback?.error) {
        router.refresh()
        setErrors(null)
        setLoginErrors(null)
        setMessage(message as string)
        session.update()
        router.push("/")
      }
    })
  }

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     redirect(searchParams.get("callbackUrl") || "/")
  //   }
  // }, [searchParams, session?.status])

  return (
    <>
      <Image
        src={logoType}
        alt={process.env.NEXT_PUBLIC_TITLE as string}
        className="mx-auto w-3/5 py-20"
      />

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

      {loginErrors && (
        <Alert variant="danger">
          <LucideAlertOctagon />
          <AlertTitle>خطا</AlertTitle>
          <AlertDescription>{loginErrors}</AlertDescription>
        </Alert>
      )}

      {!errors && message && (
        <Alert variant="success">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {formState === 0 && (
        <Form {...form}>
          <form
            id="login-username"
            onSubmit={form.handleSubmit(onSubmitStepZero)}
            noValidate
            className="flex flex-1 flex-col gap-8"
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
          </form>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setFormState(1)
            }}
          >
            ورود با رمز یکبار مصرف
          </Button>
          {/* <Link
            type="button"
            className="btn btn-secondary btn-md"
            href={"/profile"}
          >
            {t("common:back")}
          </Link> */}
          <Button
            type="submit"
            block
            form="login-username"
            disabled={pageLoading || form.formState.isSubmitting}
            loading={pageLoading || form.formState.isSubmitting}
          >
            {t("common:login")}
          </Button>
        </Form>
      )}

      {formState === 1 && (
        <Form {...formStepOne}>
          <form
            id="login-cellphone"
            onSubmit={formStepOne.handleSubmit(onSubmitStepOne)}
            noValidate
            className="flex flex-1 flex-col gap-8"
          >
            <p className="text-alpha-800">
              برای ثبت نام / ورود در
              <span className="text-primary"> وردست</span>، شماره همراه خود را
              وارد کنید.
            </p>
            <FormField
              control={formStepOne.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:cellphone")}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      dir="rtl"
                      placeholder={t("common:cellphone")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setFormState(0)
            }}
          >
            ورود با نام کاربری و رمز عبور
          </Button>
          {/* <Link
            type="button"
            className="btn btn-secondary btn-md"
            href={"/profile"}
          >
            {t("common:back")}
          </Link> */}
          <Button
            type="submit"
            block
            form="login-cellphone"
            disabled={
              validateCellphoneMutation.isLoading ||
              formStepOne.formState.isSubmitting
            }
            loading={
              validateCellphoneMutation.isLoading ||
              formStepOne.formState.isSubmitting
            }
          >
            دریافت رمز یکبار مصرف
          </Button>
        </Form>
      )}

      {formState === 2 && (
        <Form {...formStepTwo}>
          <form
            id="verify-otp-form"
            onSubmit={formStepTwo.handleSubmit(onSubmitStepTwo)}
            noValidate
            className="flex flex-1 flex-col gap-8"
          >
            <FormField
              control={formStepTwo.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common:otp")}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      dir="rtl"
                      placeholder={t("common:otp")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => {
                          setFormState(1)
                          formStepTwo.reset()
                        }}
                        size={"xsmall"}
                        type="button"
                        variant="ghost"
                      >
                        ویرایش شماره همراه
                      </Button>
                      <p
                        className={clsx("text-left", "text-sm", "text-succuss")}
                      >
                        {secondsLeft && secondsLeft > 0 ? secondsLeft : 0} ثانیه
                      </p>
                    </div>
                  }
                </FormItem>
              )}
            ></FormField>
          </form>
          <Button
            onClick={() => {
              onSubmitStepOne({ cellphone: formStepOne.watch("cellphone") })
            }}
            loading={validateCellphoneMutation.isLoading}
            disabled={secondsLeft > 0}
            variant="ghost"
            type="button"
            block
          >
            ارسال مجدد رمز یکبار مصرف
          </Button>
          <Link
            type="button"
            className="btn btn-secondary btn-md"
            href={"/profile"}
          >
            {t("common:back")}
          </Link>
          <Button
            type="submit"
            form="verify-otp-form"
            block
            disabled={
              validateOtpMutation.isLoading ||
              validateCellphoneMutation.isLoading ||
              formStepTwo.formState.isSubmitting
            }
            loading={
              pageLoading ||
              validateOtpMutation.isLoading ||
              validateCellphoneMutation.isLoading ||
              formStepTwo.formState.isSubmitting
            }
          >
            تایید تلفن همراه
          </Button>
        </Form>
      )}
    </>
  )
}

export default SigninForm
