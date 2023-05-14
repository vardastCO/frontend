import "@/styles/globals.css"
import AuthProvider from "@core/providers/AuthProvider"
import ReactQueryProvider from "@core/providers/ReactQueryProvider"
import useTranslation from "next-translate/useTranslation"
// import NextNProgress from "nextjs-progressbar"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  const { lang } = useTranslation()
  return (
    <html lang={lang}>
      <body>
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
