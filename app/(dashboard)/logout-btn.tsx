'use client'
import {logout} from '../actions'
import {Button} from '@/components/forms'
import {useRouter} from 'next/navigation'
import {useTransition} from 'react'
//import {logout} from '@/lib/client'
function Logout() {
  let [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await logout()
          router.push('/signin')
        })
      }
      size="sm"
      variant="primary"
    >
      Log out
    </Button>
  )
}

export default Logout
