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

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('__cookie_custom_name')

  if (!jwt) {
    return NextResponse.rewrite(new URL('/signin', request.url))
  }

  try {
    await verifyJWT(jwt.value)
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next()
  } catch (e) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/', '/home'],
}
