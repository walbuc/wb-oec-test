import {PropsWithChildren} from 'react'
import '@/styles/globals.css'
import {Spacer} from '@/components/spacer'

export default function RegisterLayout({children}: PropsWithChildren) {
  return (
    <div className="flex flex-grow flex-col justify-center pb-32 pt-20">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-h1">Let&apos;s start your journey!</h1>
          <p className="text-body-md text-night-200">
            Please enter your details.
          </p>
        </div>
        <Spacer size="xs" />
        {children}
      </div>
    </div>
  )
}
