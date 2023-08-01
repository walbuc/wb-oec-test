import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {jwtVerify} from 'jose'

const verifyJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode('somesecretevaluejwt'),
  )

  return payload
}

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('__cookie_custom_name')

  if (!jwt) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  verifyJWT(jwt.value).then(
    () => {
      if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url))
      }
      const requestHeaders = new Headers(request.headers)
      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      })

      return response
    },
    err => {
      return NextResponse.redirect('/error')
    },
  )
}

export const config = {
  matcher: ['/', '/home'],
}
