import { NextResponse } from "next/server";
import { BASE_URL } from "./lib/api/config";

export async function middleware(request) {
    const token = request.cookies.get("authToken") ? request.cookies.get("authToken").value : null;
    const pathname = request.nextUrl.pathname;

    if (pathname === "/auth" && token) {
        try {
            const res = await fetch(`${BASE_URL}user/role-check`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                return NextResponse.next();
            }

            const { role } = await res.json();

            if (role === "admin") {
                return NextResponse.redirect(new URL("/dashboard/admin", request.url));
            } else if (role === "user") {
                return NextResponse.redirect(new URL("/dashboard/user", request.url));
            }

            return NextResponse.next();
        } catch (err) {
            return NextResponse.next();
        }
    }

    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        try {
            const res = await fetch(`${BASE_URL}user/role-check`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                return NextResponse.redirect(new URL("/auth", request.url));
            }

            const { role } = await res.json();

            if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard/user", request.url));
            }

            if (pathname.startsWith("/dashboard/user") && role !== "user") {
                return NextResponse.redirect(new URL("/dashboard/admin", request.url));
            }

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth"],
};