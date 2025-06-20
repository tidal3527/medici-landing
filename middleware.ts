import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // If it's already a studentform path, let it through
  if (pathname.startsWith('/studentform')) {
    return NextResponse.rewrite(
      new URL(`https://medici-landing-student.vercel.app${pathname.replace('/studentform', '')}`)
    )
  }

  // Handle direct notify path
  if (pathname === '/notify') {
    return NextResponse.redirect(
      new URL('/studentform/notify', request.url)
    )
  }

  // Handle direct success path and notify/success path
  if (pathname === '/success' || pathname === '/notify/success') {
    return NextResponse.redirect(
      new URL('/studentform/notify/success', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/notify',
    '/success',
    '/notify/success',
    '/studentform/:path*'
  ]
} 