import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { ObjectId } from 'mongodb'
import prisma from './prisma.ts'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mongodb',
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: () => new ObjectId().toString(), // Default is `crypto.randomUUID()`
    },
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
  user: {
    additionalFields: {
      roles: {
        type: 'string[]',
        input: false,
      },
    },
  },
  trustedOrigins: ['http://localhost:3001'],
})
