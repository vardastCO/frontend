"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClientError } from "graphql-request"
import { LucideAlertOctagon } from "lucide-react"
import { useSession } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"
import { useForm } from "react-hook-form"
import { TypeOf, z } from "zod"

import {
  useSignupMutation,
  useValidateCellphoneMutation,
  useValidateOtpMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
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

const SingupForm = (props: Props) => {
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
    graphqlRequestClient,
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
          //   setRemainingSeconds(remainingSeconds as number)
          startCountdown(60)
          setMessage(message as string)
          setFormState(2)
        }
      }
    }
  )
  const validateOtpMutation = useValidateOtpMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: (data) => {
      const { nextState, validationKey, message } = data.validateOtp
      setErrors(null)
      setMessage(message as string)

      if (nextState === "VALIDATE_CELLPHONE") {
        setFormState(1)
      }
    }
  })
  const signupMutation = useSignupMutation(graphqlRequestClient, {
    onError: (errors: ClientError) => {
      setErrors(errors)
    },
    onSuccess: (data) => {
      const { message } = data.signup
      setErrors(null)
      setMessage(message as string)
    }
  })

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

  const SignupFormStepThreeSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional().or(z.literal("")),
    password: z.string()
  })
  type SignupFormStepThreeType = TypeOf<typeof SignupFormStepThreeSchema>

  const formStepThree = useForm<SignupFormStepThreeType>({
    resolver: zodResolver(SignupFormStepThreeSchema)
  })

  function onSubmitStepOne(data: SignupFormStepOneType) {
    const { cellphone } = data
    validateCellphoneMutation.mutate({
      ValidateCellphoneInput: {
        countryId: 244,
        cellphone
      }
    })
  }
  function onSubmitStepTwo(data: SignupFormStepTwoType) {
    const { otp } = data
    validateOtpMutation.mutate({
      ValidateOtpInput: {
        token: otp,
        validationKey
      }
    })
  }
  function onSubmitStepThree(data: SignupFormStepThreeType) {
    const { firstName, lastName, email, password } = data
    signupMutation.mutate({
      SignupInput: {
        validationKey,
        firstName,
        lastName,
        email,
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
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-xs flex-col justify-start gap-8 py-12">
        <Image
          src={signLogo}
          alt={process.env.NEXT_PUBLIC_TITLE as string}
          className="ml-auto h-12"
        />
        <h1 className="text-xl font-bold text-gray-800">
          {t("common:signup")}
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
                fullWidth
                disabled={
                  validateCellphoneMutation.isLoading ||
                  formStepOne.formState.isSubmitting
                }
                loading={
                  validateCellphoneMutation.isLoading ||
                  formStepOne.formState.isSubmitting
                }
              >
                {t("common:signup")}
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
                <Button variant="link" className="justify-start">
                  ارسال مجدد رمز یکبار مصرف
                </Button>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={
                  validateOtpMutation.isLoading ||
                  formStepTwo.formState.isSubmitting
                }
                loading={
                  validateOtpMutation.isLoading ||
                  formStepTwo.formState.isSubmitting
                }
              >
                {t("common:signup")}
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:first_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:first_name")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formStepThree.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:last_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:last_name")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formStepThree.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:email")}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={formStepThree.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("common:password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("common:password")}
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
                fullWidth
                disabled={
                  signupMutation.isLoading ||
                  formStepThree.formState.isSubmitting
                }
                loading={
                  signupMutation.isLoading ||
                  formStepThree.formState.isSubmitting
                }
              >
                {t("common:signup")}
              </Button>
            </form>
          </Form>
        )}

        <Link
          href="/auth/signin"
          className="text-center text-gray-500 hover:text-gray-700"
        >
          {t("common:already_have_an_account_login")}
        </Link>
      </div>
    </div>
  )
}

export default SingupForm
