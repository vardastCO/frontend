"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { digitsEnToFa } from "@persian-tools/persian-tools"
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
  FormMessage
} from "@core/components/react-hook-form/form"
import Link from "@core/components/shared/Link"
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import useCountdown from "@core/hooks/use-countdown"

// eslint-disable-next-line no-unused-vars
enum LoginOptions {
  // eslint-disable-next-line no-unused-vars
  PASSWORD = "PASSWORD",
  // eslint-disable-next-line no-unused-vars
  OTP = "OTP",
  // eslint-disable-next-line no-unused-vars
  VERIFY_OTP = "VERIFY_OTP"
}

type Props = { isMobileView: boolean }

const SigninForm = (_: Props) => {
  const { t } = useTranslation()
  // const session = useSession()
  const router = useRouter()
  // const searchParams = useSearchParams()
  const [formState, setFormState] = useState<LoginOptions>(LoginOptions.OTP)
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
          setFormState(LoginOptions.VERIFY_OTP)
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
            // router.push("/")
            router.back()
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
        // router.push("/")
        router.back()
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
      {/* <Link href="/"> */}
      {/* {isMobileView && (
        <Image
          src={logoType}
          alt={process.env.NEXT_PUBLIC_TITLE as string}
          className="mx-auto w-3/5 py-20"
        />
      )} */}
      {/* </Link> */}

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
      <div className="flex h-full flex-col justify-start gap-y-6 px-3 pt-[22vw] md:items-center md:pt">
        {formState === LoginOptions.VERIFY_OTP ? (
          <>
            <h3 className="font-semibold">لطفا کد تایید را وارد کنید.</h3>
            <p className="text-alpha-800">
              کد تایید برای شماره {digitsEnToFa(formStepOne.watch("cellphone"))}
              پیامک شد.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-semibold">ورود | ثبت‌نام</h3>
            <div className="text-md flex flex-col gap-y-2">
              <p className="text-alpha-800">سلام!</p>
              <p className="text-alpha-800">
                لطفا شماره موبایل خود را وارد کنید.
              </p>
            </div>
          </>
        )}
        <div className="flex min-h-[calc(100vw/4)] flex-col justify-center md:mx-auto md:w-1/4">
          {formState === LoginOptions.PASSWORD && (
            <Form {...form}>
              <form
                id="login-username"
                onSubmit={form.handleSubmit(onSubmitStepZero)}
                noValidate
                className="flex flex-col gap-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>{t("common:username")}</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder={t("common:cellphone")}
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
                      {/* <FormLabel>{t("common:password")}</FormLabel> */}
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
            </Form>
          )}

          {formState === LoginOptions.OTP && (
            <Form {...formStepOne}>
              <form
                id="login-cellphone"
                onSubmit={formStepOne.handleSubmit(onSubmitStepOne)}
                noValidate
                className="flex flex-1 flex-col gap-8"
              >
                <FormField
                  control={formStepOne.control}
                  name="cellphone"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>{t("common:cellphone")}</FormLabel> */}
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
            </Form>
          )}

          {formState === LoginOptions.VERIFY_OTP && (
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
                      {/* <FormLabel>{t("common:otp")}</FormLabel> */}
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
                              setFormState(LoginOptions.OTP)
                              formStepTwo.reset()
                            }}
                            size={"xsmall"}
                            type="button"
                            variant="ghost"
                          >
                            ویرایش شماره همراه
                          </Button>
                          <p
                            className={clsx(
                              "text-left",
                              "text-sm",
                              "text-succuss"
                            )}
                          >
                            {secondsLeft && secondsLeft > 0 ? secondsLeft : 0}{" "}
                            ثانیه
                          </p>
                        </div>
                      }
                    </FormItem>
                  )}
                ></FormField>
              </form>
            </Form>
          )}
          <div className="flex flex-col gap-y">
            {formState !== LoginOptions.VERIFY_OTP && (
              <div className="flex flex-col justify-center gap-y-7 py-7">
                <div
                  onClick={() => {
                    setFormState(LoginOptions.OTP)
                  }}
                  className="flex cursor-pointer items-center gap-x-2"
                >
                  <Circle solid={formState === LoginOptions.OTP} />
                  <span className="text-sm text-info">
                    دریافت رمز یکبار مصرف
                  </span>
                </div>
                <div
                  onClick={() => {
                    setFormState(LoginOptions.PASSWORD)
                  }}
                  className="flex cursor-pointer items-center gap-x-2"
                >
                  <Circle solid={formState === LoginOptions.PASSWORD} />
                  <span className="text-sm text-info">ورود با رمز عبور</span>
                </div>
              </div>
            )}
            {formState === LoginOptions.PASSWORD && (
              <Button
                type="submit"
                block
                form="login-username"
                disabled={pageLoading || form.formState.isSubmitting}
                loading={pageLoading || form.formState.isSubmitting}
              >
                {t("common:login")}
              </Button>
            )}
            {formState === LoginOptions.OTP && (
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
            )}
            {formState === LoginOptions.VERIFY_OTP && (
              <>
                <Button
                  onClick={() => {
                    onSubmitStepOne({
                      cellphone: formStepOne.watch("cellphone")
                    })
                  }}
                  loading={validateCellphoneMutation.isLoading}
                  disabled={secondsLeft > 0}
                  variant="ghost"
                  type="button"
                  block
                >
                  ارسال مجدد رمز یکبار مصرف
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
              </>
            )}
            {formState !== LoginOptions.VERIFY_OTP && (
              <div className="text-sm">
                ورود شما به معنای پذیرش
                <Link href="/privacy" className="text-primary underline">
                  {" "}
                  شرایط و قوانین وردست{" "}
                </Link>
                می‌باشد.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const Circle = ({ solid }: { solid?: boolean }) => {
  return (
    <span
      className={clsx(
        "relative flex h-5 w-5 flex-col items-center justify-center rounded-full border bg-alpha-50"
      )}
    >
      <span
        className={clsx(
          "absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
          solid && "bg-info"
        )}
      ></span>
    </span>
  )
}

export default SigninForm
