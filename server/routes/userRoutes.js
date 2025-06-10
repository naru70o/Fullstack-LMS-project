import { forgetPassword, resetPassword } from "../controllers/authController.js";
import express from "express";
import { getAllUsers, updateProfile, changepassword } from "../controllers/usersController.js";
import { protectRoute } from "../middlewares/protectRoute.js"

const userRouter = express.Router()

userRouter.patch("/forgetpassword", forgetPassword)
userRouter.route("/resetpassword/:token").patch(resetPassword)
userRouter.route("/updateprofile").patch(protectRoute, updateProfile)
userRouter.route("/changepassword").patch(protectRoute, changepassword)
userRouter.route("/").get(protectRoute, getAllUsers)

export default userRouter;