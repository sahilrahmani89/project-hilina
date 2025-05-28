import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const { pathname } = req.nextUrl;

    // Define public routes
    const publicRoutes = ["/login", "/signup"];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Redirect authenticated users trying to access public routes
    if (isPublicRoute && isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // IMPORTANT: Always return true for public routes
      authorized: ({ token, req }) => {
        const publicRoutes = ["/login", "/signup"];
        return publicRoutes.includes(req.nextUrl.pathname) 
          ? true  // Allow access to public routes regardless of auth
          : !!token;  // Protect other routes
      },
    },
  }
);

export const config = {
  matcher: ["/about", "/profile", "/login", "/signup"],
};