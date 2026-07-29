import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("xwing_cleared")) {
    const gateUrl = new URL("/game", request.url);
    gateUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(gateUrl);
  }
  return NextResponse.next();
}

// Every page is gated except /game itself, Next.js internals, and static
// assets (anything with a file extension, e.g. images/fonts/pdf).
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|game|favicon\\.ico|.*\\..*).*)"],
};
