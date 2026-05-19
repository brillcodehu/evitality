import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/blog",
  "/contact",
  "/portfolio",
  "/login",
  "/register",
  "/api/auth",
  "/api/calendar",
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    // Redirect authenticated users away from login/register
    if (session && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require authentication
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes - require trainer role
  if (pathname.startsWith("/admin")) {
    if (session.user.role !== "trainer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (Next internals)
     * - favicon.ico
     * - /assets (bodyshape template static files: css, fonts, images, vendor)
     * - any static asset file extension
     *
     * NOTE: previously only image extensions were excluded, so every
     * .css / font request was redirected to /login (307) and the whole
     * site loaded completely unstyled.
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:css|js|mjs|map|json|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|eot)$).*)",
  ],
};
