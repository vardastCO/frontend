import graphqlRequestClient from "@/@core/clients/graphqlRequestClient"
import { Button } from "@/@core/components/ui/Button"
import BlankLayout from "@/@core/layouts/BlankLayout"
import {
  passwordInputSchema,
  tsReactFormDefaultMapping
} from "@/@core/utils/tsReactFormDefaultMapping"
import { useLoginUserMutation } from "@/generated"
import { NextPageWithLayout } from "@/pages/_app"
import { createTsForm } from "@ts-react/form"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement } from "react"
import { z } from "zod"
import { makeZodI18nMap } from "zod-i18n-map"

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}

const MyForm = createTsForm(tsReactFormDefaultMapping)

const LoginPage: NextPageWithLayout = () => {
  const { t } = useTranslation("common")
  z.setErrorMap(makeZodI18nMap({ t }))
  const loginMutation = useLoginUserMutation(graphqlRequestClient, {
    onSuccess: async (data) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: data })
      })
    }
  })

  const LoginSchema = z.object({
    username: z.string().describe(t("username")),
    password: passwordInputSchema.describe(t("password"))
  })

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    const { username, password } = data
    loginMutation.mutate({
      loginInput: {
        username,
        password
      }
    })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-n-gray-100 p-4">
      <div className="card w-full max-w-sm bg-white p-6">
        <MyForm
          formProps={{
            className: "flex flex-col gap-6"
          }}
          schema={LoginSchema}
          onSubmit={onSubmit}
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
