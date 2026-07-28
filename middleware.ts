import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("xwing_cleared")) {
    return NextResponse.redirect(new URL("/game", request.url));
  }
  return NextResponse.next();
}

// Only the home page is gated; /game, /resume, and assets stay reachable.
export const config = {
  matcher: "/",
};
