'use client'
import {Button, ButtonLink, Field} from '@/components/forms'
import {useAsync} from '@/hooks/useAsync'
import Link from 'next/link'
import {signin} from '@/lib/client'
import {ListOfErrors} from '@/components/forms'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements
}

function getFormError(error?: FormError) {
  return typeof error === 'string' ? error : error && error.error
}

type FormError = string | {error: string}

type FieldErrors = {
  errors?: {
    fieldErrors?: {
      email?: ListOfErrors
      password?: ListOfErrors
    }
  }
}

type FormErrors = FieldErrors & FormError

function getFieldsErrors(error?: FormErrors): {
  email: ListOfErrors
  password: ListOfErrors
} {
  if (error && error.errors) {
    if (error.errors.fieldErrors) {
      return {
        email: error.errors.fieldErrors.email,
        password: error.errors.fieldErrors.password,
      }
    }
  }
  return {email: [], password: []}
}

export default function InlineLogin() {
  const {error, run, status, reset} = useAsync()
  const router = useRouter()
  const fields = getFieldsErrors(error)
  const formError = getFormError(error)

  useEffect(() => {
    if (status === 'success') {
      router.push('/home')
    }
  }, [status, router])

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    run(signin({email, password}))
  }

  return (
    <div className="mx-auto w-full max-w-md px-8">
      <form name="login" onSubmit={handleSubmit}>
        <Field
          labelProps={{children: 'Email'}}
          inputProps={{
            name: 'email',
            autoComplete: 'email',
          }}
          errors={fields.email}
        />

        <Field
          labelProps={{children: 'Password'}}
          inputProps={{
            name: 'password',
            autoComplete: 'password',
            type: 'password',
          }}
          errors={fields.password}
        />
        {formError && formError}
        <div className="flex flex-col items-center justify-between gap-6 pt-3">
          <Button
            className="w-full"
            size="md"
            variant="primary"
            status={status === 'pending' ? 'pending' : status ?? 'idle'}
            type="submit"
            disabled={status !== 'idle'}
          >
            Log in
          </Button>
          {error && (
            <Button variant="secondary" size="md" onClick={reset}>
              Reset
            </Button>
          )}
        </div>
      </form>
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-night-200">New here?</span>
        <Link href="/register">Create an account</Link>
      </div>
    </div>
  )
}
