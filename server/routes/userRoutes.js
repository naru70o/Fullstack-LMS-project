import { forgetPassword, resetPassword } from "../controllers/authController.js";
import express from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { protectRoute } from "../middlewares/protectRoute.js"

const userRouter = express.Router()

userRouter.patch("/forgetpassword", forgetPassword)
userRouter.route("/resetpassword/:token").patch(resetPassword)
userRouter.route("/").get(protectRoute, getAllUsers)

export default userRouter;