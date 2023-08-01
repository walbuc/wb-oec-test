import {NextApiRequest, NextApiResponse} from 'next'
import {serialize} from 'cookie'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    'Set-Cookie',
    serialize(process.env.COOKIE_NAME!, '', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }),
  )
  res.status(201)
  res.json({})
}
