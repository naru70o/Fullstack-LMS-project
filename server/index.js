import dotenv from "dotenv";
import express from "express"
import morgan from "morgan"
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors"
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
app.use(mongoSanitize());

// Body parser 
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))
app.use(cors({
    cors:"http//localhost:5173",
    methods:["GET","POST","PUT","PATCH"],
    credentials:true,
    allowedHeaders:[
       'Content-Type', 'Authorization', 'X-Custom-Header'
    ]
}));
app.use(cookieParser())

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
}) // 
// today i got  ruined my ubunto os and i'm using  pure terminal without any GUI, to write this comment
