import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
//import {jwtVerify} from 'jose'

const PUBLIC_FILE = /\.(.*)$/

// const verifyJWT = async (jwt: string) => {
//   const {payload} = await jwtVerify(
//     jwt,
//     new TextEncoder().encode('somesecretevaluejwt'),
//   )

//   return payload
// }

export default async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/static') ||
    req.nextUrl.pathname.startsWith('/signin') ||
    req.nextUrl.pathname.startsWith('/register')
  ) {
    return NextResponse.next()
  }

  const jwt = req.cookies.get('__cookie_custom_name')
  if (!jwt) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
  try {
    // await verifyJWT(jwt.value)
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
    // if (pathname === '/signin' || pathname === '/register') {
    //   return NextResponse.redirect(new URL('/home', req.url))
    // }
    return NextResponse.next()
  } catch (e) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
}
