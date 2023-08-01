'use server'

import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

async function logout() {
  cookies().set({
    name: process.env.COOKIE_NAME!,
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
  })
  return Promise.resolve()
}

export {logout}
