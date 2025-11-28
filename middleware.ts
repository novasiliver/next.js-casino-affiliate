import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUserEdge } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const user = await getCurrentUserEdge(request);
    
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};

