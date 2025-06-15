import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Role IDs
const ROLES = {
  STAFF: '1376876672409669672',
  TRAINER: '1376876703808360559',
  DASHBOARD: '1377651835715846214',
} as const;

type Role = keyof typeof ROLES;

// Paths that don't require authentication
const publicPaths = ['/', '/auth/signin', '/auth/error', '/unauthorized'];

// Role-based path access
const rolePaths: Record<string, Role[]> = {
  '/staff': ['STAFF'],
  '/trainers': ['TRAINER'],
  '/applications/trainer': ['STAFF'],
  '/dashboard': ['DASHBOARD'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the session token
  const token = await getToken({ req: request });
  
  // Redirect to signin if not authenticated
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check role-based access
  const userRoles = (token.roles as string[]) || [];
  
  // Find the first path that matches the current pathname
  const [requiredPath] = Object.entries(rolePaths).find(([path]) => 
    pathname.startsWith(path)
  ) || [];

  if (requiredPath) {
    const requiredRoles = rolePaths[requiredPath] || [];
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.includes(ROLES[role])
    );

    if (!hasRequiredRole) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
