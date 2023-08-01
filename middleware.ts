import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('__cookie_custom_name')

  if (!jwt) {
    return NextResponse.redirect(new URL('/signin', request.url))
  } else {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}

export const config = {
  matcher: '/',
}
