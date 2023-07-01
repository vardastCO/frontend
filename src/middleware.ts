import i18n from 'i18n'
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
    function middleware(request: NextRequest) {
        const locale = request.nextUrl.locale || i18n.defaultLocale
        request.nextUrl.searchParams.set('lang', locale)
        request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '')

        return NextResponse.rewrite(request.nextUrl.href)
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { matcher: ["/admin/:path*"] }
