import AuthProvider from "@/@core/components/shared/AuthProvider"
import "@/styles/globals.css"
// import NextNProgress from "nextjs-progressbar"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <AuthProvider>
      <html lang={lang}>
        <body>{children}</body>
      </html>
    </AuthProvider>
  )
}
