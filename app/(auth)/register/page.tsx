'use client'
import {Button, Field} from '@/components/forms'
import {useAsync} from '@/hooks/useAsync'
import {register} from '@/lib/client'
import {useRouter} from 'next/navigation'
import {ListOfErrors} from '@/components/forms'

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

export default function InlineRegister() {
  const {error, run, status, reset} = useAsync()
  const fields = getFieldsErrors(error)
  const formError = getFormError(error)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<CustomForm>) {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    await run(register({email, password}))
    router.push('/home')
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-md px-8">
        <form method="POST" name="login" onSubmit={handleSubmit}>
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
          {formError}
          <div className="flex items-center justify-between gap-6 pt-3">
            <Button
              className="w-full"
              size="md"
              variant="primary"
              status={status === 'pending' ? 'pending' : status ?? 'idle'}
              type="submit"
              disabled={status !== 'idle'}
            >
              Create an account
            </Button>
            {error && (
              <Button variant="secondary" size="md" onClick={reset}>
                Reset
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
