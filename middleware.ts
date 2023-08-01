import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
export const protectedRoutes = ['/home', '/country/*']
export const authRoutes = ['/login', 'register']
export const publicRoutes = ['/about', '/']

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('__cookie_custom_name')
  if (protectedRoutes.includes(request.nextUrl.pathname) && !jwt) {
    request.cookies.delete('__cookie_custom_name')
    const response = NextResponse.redirect(new URL('/signin', request.url))
    response.cookies.delete('__cookie_custom_name')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && jwt) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}
