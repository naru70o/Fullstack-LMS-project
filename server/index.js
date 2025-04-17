import dotenv from "dotenv";
import express from "express"
import morgan from "morgan"

dotenv.config()

const app = express();

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
app.use(morgan("tiny",(req ,res )=>{
    console.log(`${req} / ${res}`)
}))

app.listen(process.env.PORT,()=>{
    console.log(`app is running at ${process.env.PORT}`)
})
