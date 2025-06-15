import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');
  const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');

  // Allow API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle auth pages
  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (!isLoggedIn && isDashboardPage) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl.origin));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
