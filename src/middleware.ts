import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
  // Placeholder for future rate limiting or auth logic
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
