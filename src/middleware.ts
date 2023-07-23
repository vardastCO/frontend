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

  const searchPathRegexp = pathToRegexp("/search/:slug1/:slug2?")
  const searchPathRegexpText = searchPathRegexp.exec(request.nextUrl.pathname)
  if (searchPathRegexpText) {
    const id = searchPathRegexpText[1]
    const title = searchPathRegexpText[2]
    const data = await fetch(`${request.nextUrl.origin}/api/categories/${id}`)
    if (data && data.status === 200) {
      const res = await data.json()
      if (!title || title !== encodeURI(res.category.title)) {
        request.nextUrl.searchParams.delete("lang")
        return NextResponse.redirect(
          new URL(
            `/search/${res.category.id}/${res.category.title}?${request.nextUrl.searchParams}`,
            request.url
          ),
          301
        )
      }
    }
  }

  const brandPathRegexp = pathToRegexp("/brand/:slug1/:slug2?")
  const brandPathRegexpText = brandPathRegexp.exec(request.nextUrl.pathname)
  if (brandPathRegexpText) {
    const id = brandPathRegexpText[1]
    const title = brandPathRegexpText[2]
    const data = await fetch(`${request.nextUrl.origin}/api/brands/${id}`)
    if (data && data.status === 200) {
      const res = await data.json()
      if (!title || title !== encodeURI(res.brand.name)) {
        request.nextUrl.searchParams.delete("lang")
        return NextResponse.redirect(
          new URL(
            `/brand/${res.brand.id}/${res.brand.name}?${request.nextUrl.searchParams}`,
            request.url
          ),
          301
        )
      }
    }
  }

  const sellerPathRegexp = pathToRegexp("/seller/:slug1/:slug2?")
  const sellerPathRegexpText = sellerPathRegexp.exec(request.nextUrl.pathname)
  if (sellerPathRegexpText) {
    const id = sellerPathRegexpText[1]
    const title = sellerPathRegexpText[2]
    const data = await fetch(`${request.nextUrl.origin}/api/sellers/${id}`)
    if (data && data.status === 200) {
      const res = await data.json()
      console.log(request.url)
      if (!title || title !== encodeURI(res.seller.name)) {
        request.nextUrl.searchParams.delete("lang")
        return NextResponse.redirect(
          new URL(
            `/seller/${res.seller.id}/${res.seller.name}?${request.nextUrl.searchParams}`,
            request.url
          ),
          301
        )
      }
    }
  }

  return NextResponse.rewrite(request.nextUrl.href)
}

export const config = {
  matcher: ["/p/:path*", "/search/:path*", "/brand/:path*", "/seller/:path*"]
}
