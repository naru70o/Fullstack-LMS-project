import { auth } from '@/lib/auth.ts'
import type { Request, Response } from 'express'

export async function signupEmailAndPassword(
  req: Request<{}, {}, { name: string; email: string; password: string }>,
  res: Response,
) {
  try {
    const { name, email, password } = req.body
    console.log(name, email, password)
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image: 'https://example.com/image.png',
      },
    })

    return res.status(201).json({ success: true, data })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, error: 'Internal Server Error' })
  }
}

export async function signinEmail(req: Request, res: Response) {
  const { email, password } = req.body
  try {
    const data = auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
    return res.status(201).json({
      message: 'signed in the user',
      data: data,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, error: 'Internal Server Error' })
  }
}
