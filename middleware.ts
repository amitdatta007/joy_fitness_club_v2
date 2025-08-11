import { NextResponse, NextRequest } from "next/server";
// export { auth as middleware } from "@/lib/auth"

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname === '/') {
        return NextResponse.redirect(
            new URL('/dashboard', request.url)
        )
    }
}



export const config = {
    matcher: [
        "/((?!api|assets|docs|.*\\..*|_next).*)",
    ],
};