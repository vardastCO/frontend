import { NextRequest, NextResponse } from "next/server"
import i18n from "i18n"
import { withAuth } from "next-auth/middleware"
import { pathToRegexp } from "path-to-regexp"

export default withAuth(
  async function middleware(request: NextRequest) {
    const locale = request.nextUrl.locale || i18n.defaultLocale
    request.nextUrl.searchParams.set("lang", locale)
    request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, "")

    const productPathRegexp = pathToRegexp("/p/:slug1/:slug2?")
    const productPathRegexpText = productPathRegexp.exec(
      request.nextUrl.pathname
    )
    if (productPathRegexpText) {
      const id = productPathRegexpText[1]
      const name = productPathRegexpText[2]
      if (!name) {
        return NextResponse.redirect(
          new URL(`/p/${id}/${"hello"}`, request.url),
          301
        )
      }
    }

    return NextResponse.rewrite(request.nextUrl.href)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
