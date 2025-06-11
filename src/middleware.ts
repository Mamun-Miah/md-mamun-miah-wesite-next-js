import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proxy all /wp-content/* requests to the WordPress host
  if (pathname.startsWith('/wp-content/')) {
    const proxyUrl = `https://linen-squirrel-954851.hostingersite.com${pathname}`
    return NextResponse.rewrite(proxyUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/wp-content/:path*'],
}
