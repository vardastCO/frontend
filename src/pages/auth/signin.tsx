import { Button } from "@/@core/components/ui/Button"
import BlankLayout from "@/@core/layouts/BlankLayout"
import {
  passwordInputSchema,
  tsReactFormDefaultMapping
} from "@/@core/utils/tsReactFormDefaultMapping"
import { NextPageWithLayout } from "@/pages/_app"
import { createTsForm } from "@ts-react/form"
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"
import { getCsrfToken, signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      ...(await serverSideTranslations(context.locale as string))
    }
  }
}

const MyForm = createTsForm(tsReactFormDefaultMapping)

const LoginPage: NextPageWithLayout = ({
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common")
  z.setErrorMap(makeZodI18nMap({ t }))

  const LoginSchema = z.object({
    username: z.string().describe(t("username")),
    password: passwordInputSchema.describe(t("password"))
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const { username, password } = data
    signIn("credentials", {
      redirect: true,
      callbackUrl: "/admin",
      username,
      password
    })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-n-gray-100 p-4">
      <div className="card w-full max-w-sm bg-white p-6">
        <MyForm
          formProps={{
            action: "/api/auth/callback/credentials",
            method: "POST",
            className: "flex flex-col gap-6"
          }}
          schema={LoginSchema}
          onSubmit={onSubmit}
          renderBefore={() => (
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          )}
          renderAfter={() => (
            <div>
              <Button intent="primary" type="submit" fullWidth>
                {t("login")}
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>
}

export default LoginPage
