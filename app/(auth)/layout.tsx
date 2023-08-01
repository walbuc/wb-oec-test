import React, {PropsWithChildren} from 'react'
import Link from 'next/link'

function AuthRootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en" className={'dark h-full'}>
      <head />
      <body className="flex h-full flex-col justify-between bg-slate-800 text-white">
        <header className="container mx-auto py-6">
          <nav className="flex justify-between">
            <Link href={'/home'}>
              <div className="font-light text-accent-yellow">OEC</div>
              <div className="font-bold text-accent-yellow">Data</div>
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}

export default AuthRootLayout
