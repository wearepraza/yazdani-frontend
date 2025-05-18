import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const authToken = req.cookies.get('authToken');
    const dashboardPathCookie = req.cookies.get('dashboardPath');
    const token = authToken ? authToken.value : null;
    const dashboardPath = dashboardPathCookie ? dashboardPathCookie.value : null;

    const referer = req.headers.get('referer');

    if (pathname === '/auth' && token && dashboardPath) {
        return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    if (pathname.startsWith('/dashboard')) {
        if (!token || !dashboardPath) {
            return NextResponse.redirect(new URL('/auth', req.url));
        }

        const isDirectAccess = !referer || !referer.startsWith(req.nextUrl.origin);

        if (isDirectAccess && pathname !== dashboardPath) {
            return NextResponse.redirect(new URL(dashboardPath, req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth'],
};