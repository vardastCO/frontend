import { NextRequest, NextResponse } from "next/server"
import i18n from "i18n"
import { pathToRegexp } from "path-to-regexp"

export default async function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale || i18n.defaultLocale
  request.nextUrl.searchParams.set("lang", locale)
  request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, "")

  const productPathRegexp = pathToRegexp("/p/:slug1/:slug2?")
  const productPathRegexpText = productPathRegexp.exec(request.nextUrl.pathname)
  if (productPathRegexpText) {
    const id = productPathRegexpText[1]
    const name = productPathRegexpText[2]
    const data = await fetch(`${request.nextUrl.origin}/api/products/${id}`)
    if (data && data.status === 200) {
      const res = await data.json()
      if (!name || name !== encodeURI(res.product.name)) {
        return NextResponse.redirect(
          new URL(`/p/${res.product?.id}/${res.product?.name}`, request.url),
          301
        )
      }
    }
  }

  return NextResponse.rewrite(request.nextUrl.href)
}

export const config = {
  matcher: ["/p/:path*"]
}
// export const config = {
//   matcher: ["/((?!favicon.ico).*)"]
// }
