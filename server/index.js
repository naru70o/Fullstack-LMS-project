import dotenv from "dotenv";
import express from "express"
import morgan from "morgan"
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet"

dotenv.config()

const app = express();

const limiter= rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// SECURITY MIDDLEWARES
app.use("/api",limiter)
app.use(helmet())

// Body parser 
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))

// GLOBAL ERROR HANDLER
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(err.status || 500).json({
        status:"error",
        message:err.message||"internal server error",
        ...app(process.env.NODE_ENV==="development" && {stack:err.stack})
    })
})

// logger
app.use(morgan("dev",(req ,res )=>{
    console.log(`${req} / ${res}`)
}))

app.listen(process.env.PORT,()=>{
    console.log(`app is running at ${process.env.PORT}`)
})
