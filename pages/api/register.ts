import {NextApiRequest, NextApiResponse} from 'next'
import {db} from '@/lib/db'
import {createJWT, hashPassword} from '@/lib/auth'
import {serialize} from 'cookie'
import {z} from 'zod'
import {passwordSchema, emailSchema} from '@/lib/user-validation'

export const RegisterFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {email, password} = req.body
    const result = RegisterFormSchema.safeParse({email, password})
    if (!result.success) {
      res.status(400)
      return res.json({
        errors: result.error.flatten(),
      })
    }

    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    })

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
    res.status(402)
    res.json({})
  }
}
