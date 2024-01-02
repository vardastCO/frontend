"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  usePasswordResetMutation,
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
import { Alert, AlertDescription, AlertTitle } from "@core/components/ui/alert"
import { Button } from "@core/components/ui/button"
import { Input } from "@core/components/ui/input"
import useCountdown from "@core/hooks/use-countdown"

import signLogo from "@/assets/sign.svg"

type Props = {}

const ResetForm = (_: Props) => {
  const { t } = useTranslation()
  const session = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formState, setFormState] = useState<number>(1)
  const [validationKey, setValidationKey] = useState<string>("")
  const [errors, setErrors] = useState<ClientError | null>()
  const [message, setMessage] = useState<string>("")
  const { secondsLeft, startCountdown } = useCountdown()
  z.setErrorMap(zodI18nMap)

  const validateCellphoneMutation = useValidateCellphoneMutation(
    graphqlRequestClientWithoutToken,
    {
      onError: (errors: ClientError) => {
        setErrors(errors)
      },
      onSuccess: (data) => {
        const { nextState, message, remainingSeconds, validationKey } =
          data.validateCellphone
        setErrors(null)

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
        setErrors(errors)
      },
      onSuccess: (data) => {
        const { nextState, message } = data.validateOtp
        setErrors(null)
        setMessage(message as string)

        if (nextState === "VALIDATE_CELLPHONE") {
          setFormState(1)
        }

        if (nextState === "PASSWORD_RESET") {
          setFormState(3)
        }

        if (nextState === "LOGIN") {
          router.push("/auth/signin")
        }
      }
    }
  )
  const passwordResetMutation = usePasswordResetMutation(
    graphqlRequestClientWithoutToken,
    {
      onError: (errors: ClientError) => {
        setErrors(errors)
      },
      onSuccess: (data) => {
        const { message, nextState } = data.passwordReset
        setErrors(null)

        if (nextState === "VALIDATE_CELLPHONE") {
          setFormState(1)
        }

        if (nextState === "LOGIN") {
          router.push("/auth/signin")
        }

        setMessage(message as string)
      }
    }
  )

  const PasswordResetFormStepOneSchema = z.object({
    cellphone: cellphoneNumberSchema
  })
  type PasswordResetFormStepOneType = TypeOf<
    typeof PasswordResetFormStepOneSchema
  >

  const formStepOne = useForm<PasswordResetFormStepOneType>({
    resolver: zodResolver(PasswordResetFormStepOneSchema)
  })

  const PasswordResetFormStepTwoSchema = z.object({
    otp: z.string()
  })
  type PasswordResetFormStepTwoType = TypeOf<
    typeof PasswordResetFormStepTwoSchema
  >

  const formStepTwo = useForm<PasswordResetFormStepTwoType>({
    resolver: zodResolver(PasswordResetFormStepTwoSchema)
  })

  const PasswordResetFormStepThreeSchema = z.object({
    password: z.string()
  })
  type PasswordResetFormStepThreeType = TypeOf<
    typeof PasswordResetFormStepThreeSchema
  >

  const formStepThree = useForm<PasswordResetFormStepThreeType>({
    resolver: zodResolver(PasswordResetFormStepThreeSchema)
  })

  function onSubmitStepOne(data: PasswordResetFormStepOneType) {
    const { cellphone } = data
    validateCellphoneMutation.mutate({
      ValidateCellphoneInput: {
        countryId: 244,
        cellphone,
        validationType: ValidationTypes.PasswordReset
      }
    })
  }
  function onSubmitStepTwo(data: PasswordResetFormStepTwoType) {
    const { otp } = data
    validateOtpMutation.mutate({
      ValidateOtpInput: {
        token: otp,
        validationKey,
        validationType: ValidationTypes.PasswordReset
      }
    })
  }
  function onSubmitStepThree(data: PasswordResetFormStepThreeType) {
    const { password } = data
    passwordResetMutation.mutate({
      SignupInput: {
        validationKey,
        password
      }
    })
  }

  useEffect(() => {
    if (session?.status === "authenticated") {
      redirect(searchParams.get("callbackUrl") || "/admin")
    }
  })

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-alpha-50 p-4">
      <div className="flex w-full max-w-xs flex-col justify-start gap-8 py-12">
        <Image
          src={signLogo}
          alt={process.env.NEXT_PUBLIC_TITLE as string}
          className="ml-auto h-12"
        />
        <h1 className="text-xl font-bold text-alpha-800">
          {t("common:reset_password")}
        </h1>

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

        {!errors && message && (
          <Alert variant="success">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {formState === 1 && (
          <Form {...formStepOne}>
            <form
              onSubmit={formStepOne.handleSubmit(onSubmitStepOne)}
              noValidate
              className="flex flex-col gap-6"
            >
              <FormField
                control={formStepOne.control}
                name="cellphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:cellphone")}</FormLabel>
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

              <Button
                type="submit"
                block
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
            </form>
          </Form>
        )}

        {formState === 2 && (
          <Form {...formStepTwo}>
            <form
              onSubmit={formStepTwo.handleSubmit(onSubmitStepTwo)}
              noValidate
              className="flex flex-col gap-6"
            >
              <FormField
                control={formStepTwo.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:otp")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:otp")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {secondsLeft && secondsLeft > 0 ? (
                <span>ارسال مجدد رمز {secondsLeft}</span>
              ) : (
                <Button
                  onClick={() => setFormState(1)}
                  variant="link"
                  className="justify-start"
                >
                  ارسال مجدد رمز یکبار مصرف
                </Button>
              )}

              <Button
                type="submit"
                block
                disabled={
                  validateOtpMutation.isLoading ||
                  formStepTwo.formState.isSubmitting
                }
                loading={
                  validateOtpMutation.isLoading ||
                  formStepTwo.formState.isSubmitting
                }
              >
                تایید تلفن همراه
              </Button>
            </form>
          </Form>
        )}

        {formState === 3 && (
          <Form {...formStepThree}>
            <form
              onSubmit={formStepThree.handleSubmit(onSubmitStepThree)}
              noValidate
              className="flex flex-col gap-6"
            >
              <FormField
                control={formStepThree.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:new_password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:new_password")}
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
                disabled={
                  passwordResetMutation.isLoading ||
                  formStepThree.formState.isSubmitting
                }
                loading={
                  passwordResetMutation.isLoading ||
                  formStepThree.formState.isSubmitting
                }
              >
                تغییر کلمه عبور
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}

export default ResetForm
