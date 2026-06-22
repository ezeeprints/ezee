import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /observatory routes
  if (pathname === '/observatory' || pathname.startsWith('/observatory/')) {
    // If they are not going to the login page, redirect them to the login page
    // Note: In a real app we'd check for a session cookie here.
    // For this simulation, if we don't have a fake cookie, we redirect.
    // We will use a dummy cookie check just to satisfy the pattern.
    const hasAdminSession = request.cookies.has('ezee_admin_session');
    
    if (!hasAdminSession && pathname !== '/observatory/login') {
      return NextResponse.redirect(new URL('/observatory/login', request.url));
    }
  }

  // Protect /workshop routes
  if (pathname === '/workshop' || pathname.startsWith('/workshop/')) {
    const hasVendorSession = request.cookies.has('ezee_vendor_session');

    if (!hasVendorSession && pathname !== '/workshop/login') {
      return NextResponse.redirect(new URL('/workshop/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/observatory/:path*', '/workshop/:path*'],
};
