import { forgetPassword, resetPassword } from "../controllers/authController.js";
import express from "express";

const userRouter = express.Router()

userRouter.patch("/forgetpassword", forgetPassword)
// userRouter.route("/user/resetpassword/:token").patch(resetPassword)

export default userRouter;