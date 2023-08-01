import {PropsWithChildren} from 'react'
import '@/styles/globals.css'
import {Spacer} from '@/components/spacer'

export default function DashboardRootLayout({children}: PropsWithChildren) {
  return (
    <div className="flex flex-grow flex-col justify-center ">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Welcome back!</h1>
          <p className="text-body-md text-night-200">
            Please enter your details.
          </p>
        </div>
        <Spacer size="xs" />
        <div>{children}</div>
      </div>
    </div>
  )
}
