// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("authToken") ? request.cookies.get("authToken").value : null;

    const isDashboardPath = request.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboardPath && !token) {
        const loginUrl = new URL("/auth", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// تعیین مسیرهایی که middleware روی آن‌ها اعمال شود
export const config = {
    matcher: ["/dashboard/:path*"],
};