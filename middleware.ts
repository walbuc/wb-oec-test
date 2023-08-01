import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {jwtVerify} from 'jose'

const PUBLIC_FILE = /\.(.*)$/

const verifyJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode('somesecretevaluejwt'),
  )

  return payload
}

export default async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const jwt = req.cookies.get('__cookie_custom_name')

  if (!jwt) {
    return NextResponse.rewrite(new URL('/signin', req.url))
  }

  try {
    await verifyJWT(jwt.value)
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
    if (pathname === '/signin' || pathname === '/register') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
    return NextResponse.next()
  } catch (e) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
}
