import { sessionOptions } from '@/@core/lib/sessionConfig';
import { getIronSession } from "iron-session/edge";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const session = await getIronSession(request, response, sessionOptions);
    const { user } = session;

    if (!user) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return response;
}

export const config = {
    matcher: '/admin/:path*',
};
