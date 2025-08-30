import { auth } from '@/lib/auth.ts'
import AppError from '@/utils/error.ts'
import type { NextFunction, Response, Request } from 'express'
// import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User
  }
}

interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null | undefined
  roles: string[]
}

export async function session(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value)
      }
    }
    const session = await auth.api.getSession({ headers })
    if (!session) return next(new AppError('No active session', 500))
    console.log(session)
    req.user = session.user
    next()
  } catch (error) {
    return next(new AppError('Internal Server Error', 500))
  }
}
