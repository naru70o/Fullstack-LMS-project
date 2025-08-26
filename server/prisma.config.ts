import path from 'node:path'
import type { PrismaConfig } from 'prisma'

export default {
  schema: path.join('prisma/models/schema.prisma'),
} satisfies PrismaConfig
