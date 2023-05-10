import i18n from 'i18n'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const locale = request.nextUrl.locale || i18n.defaultLocale
    request.nextUrl.searchParams.set('lang', locale)
    request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '')
    return NextResponse.rewrite(request.nextUrl)
}
