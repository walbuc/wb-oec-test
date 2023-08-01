import Link from 'next/link'
import {PropsWithChildren, Suspense} from 'react'
import '@/styles/globals.css'
import GreetingsSkeleton from '@/components/greetingsSkeleton'
import Greetings from '@/components/greetings'
import Logout from './logout-btn'

export default function DashboardRootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en" className={'dark h-full'}>
      <head />
      <body className="flex h-full flex-col justify-between bg-slate-800 text-white">
        <header className="container mx-auto py-6">
          <nav className="flex items-center justify-between">
            <Link href={'/'}>
              <div className="font-light text-accent-yellow">OEC</div>
              <div className="font-bold text-accent-yellow">Data</div>
            </Link>

            <div className="flex items-center gap-10">
              <Logout />
            </div>
          </nav>
        </header>
        <div className="flex  justify-center">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        {children}
      </body>
    </html>
  )
}
