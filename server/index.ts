import dotenv from 'dotenv'
import express from 'express'
// import type {Request,Response,NexFunction} from "express";
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import hpp from 'hpp'
// import mongoSanitize from "express-mongo-sanitize";
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import dbConnection from './prisma/db.js'
import { toNodeHandler } from 'better-auth/node'

// file imports
import authRouter from './routes/authRoute.ts'
import userRouter from './routes/userRoutes.ts'
import courseRouter from './routes/courseRoute.ts'
import { auth } from './lib/auth.ts'
// import AppError from "./utils/error.ts";
dotenv.config()

// dbConnection() // this will connect the database

const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Custom-Header',
      'Cookie',
    ],
  }),
)

app.all('/api/auth/*splat', toNodeHandler(auth)) // For ExpressJS v5

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// SECURITY MIDDLEWARES
app.use('/api', limiter)
app.use(helmet())
// app.use(mongoSanitize());
app.use(hpp())

// Body parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// GLOBAL ERROR HANDLER
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//     if(err instanceof AppError) {
//     console.error(err.stack)
//     res.status(err.status || 500).json({
//         status: "error",
//         message: err.message || "internal server error",
//         ...app(process.env.NODE_ENV === "development" && { stack: err.stack })
//     })
// }
// })

// logger
app.use(
  morgan('dev', (req, res) => {
    console.log(`${req} / ${res}`)
  }),
)

// ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

app.listen(process.env['PORT'], () => {
  console.log(`app is running at ${process.env['PORT']}`)
})

//
// today i got  ruined my ubunto os and i'm using  pure terminal without any GUI, to write this comment
