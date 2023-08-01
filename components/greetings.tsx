import {getUserFromCookie} from '@/lib/auth'
import {cookies} from 'next/headers'
import {delay} from '@/lib/async'

async function getData() {
  await delay(4000)
  const user = await getUserFromCookie(cookies())
  return user
}

const Greetings = async () => {
  const user = await getData()
  return (
    <div className="h-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-body-md text-night-200" data-testid="user-display">
          Hello, {user?.email}
        </p>
      </div>
      <h4 className="text-body-md text-gray-400">
        Check your daily automated reports
      </h4>
    </div>
  )
}

export default Greetings
