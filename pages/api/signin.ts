import {NextApiRequest, NextApiResponse} from 'next'
import {db} from '@/lib/db'
import {comparePasswords, createJWT} from '@/lib/auth'
import {serialize} from 'cookie'
import {z} from 'zod'
import {passwordSchema, emailSchema} from '@/lib/user-validation'

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {email, password} = req.body
    const result = LoginFormSchema.safeParse({email, password})
    if (!result.success) {
      res.status(400)
      return res.json({
        errors: result.error.flatten(),
      })
    }
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      res.status(401)
      res.json({error: 'User does not exist'})
      return
    }

    const isUser = await comparePasswords(req.body.password, user.password)

    if (isUser) {
      const jwt = await createJWT(user)
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME!, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      )
      res.status(201)
      res.json({})
    } else {
      res.status(401)
      res.json({error: 'Invalid login credentials'})
    }
  } else {
    res.status(402)
    res.json({})
  }
}
