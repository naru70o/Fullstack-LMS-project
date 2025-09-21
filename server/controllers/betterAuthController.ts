import { auth } from '@/lib/auth.ts'
import type { Request, Response } from 'express'
import { APIError } from 'better-auth/api'

export async function signupEmailAndPassword(
  req: Request<
    {},
    {},
    { name: string; email: string; password: string; image: string }
  >,
  res: Response,
) {
  try {
    const { name, email, password, image } = req.body
    console.log(name, email, password)

    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image: image ? image : 'default.png',
      },
    })

    return res.status(201).json({ success: true, data })
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.body?.code, error.body?.message)
      return res
        .status(401)
        .json({ code: error?.body?.code, message: error.body?.message })
    } else {
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' })
    }
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
    if (error instanceof APIError) {
      return res
        .status(401)
        .json({ code: error?.body?.code, message: error.body?.message })
    } else {
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' })
    }
  }
}
