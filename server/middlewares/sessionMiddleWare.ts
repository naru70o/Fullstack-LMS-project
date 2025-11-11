import { auth } from '@/lib/auth.ts'
import AppError from '@/utils/error.ts'
import type { User } from '@/utils/types.ts'
import { fromNodeHeaders } from 'better-auth/node'
import type { NextFunction, Response, Request } from 'express'
// import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User
  }
}

export async function session(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    console.log(req.headers)
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    if (!session) return next(new AppError('No active session', 500))
    console.log(session)
    req.user = session.user
    next()
  } catch (error) {
    return next(new AppError('Internal Server Error', 500))
  }
}
