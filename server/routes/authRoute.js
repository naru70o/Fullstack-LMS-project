import express from "express";
import { signup } from "../controllers/authController.js"
const authRouter = express.Router()

const test = (req, res) => {
    res.status(200).json({
        message: "hello world",
        status: "success",
        data: 1
    })
    console.log("hi i'm running correctly")
}

authRouter.route("/signup").post(signup)
authRouter.route("/login").post(test)
authRouter.route("/logout").get(test)

export default authRouter;