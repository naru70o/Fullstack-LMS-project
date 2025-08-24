import upload from "../utils/multer.js";

import { forgetPassword, resetPassword } from "../controllers/authController.js";
import express from "express";
import { getAllUsers, updateProfile, changepassword, updateProfileImage, changeUserRole } from "../controllers/usersController.js";
import { protectRoute } from "../middlewares/protectRoute.ts"

const userRouter = express.Router()

userRouter.patch("/forgetpassword", forgetPassword)
userRouter.route("/resetpassword/:token").patch(resetPassword)
userRouter.route("/updateprofile").patch(protectRoute, updateProfile)
userRouter.route("/changepassword").patch(protectRoute, changepassword)
userRouter.route("/updateprofilepicture").patch(protectRoute, upload.single("profile"), updateProfileImage)
userRouter.route("/updaterole").post(protectRoute, changeUserRole)
userRouter.route("/").get(protectRoute, getAllUsers)

export default userRouter;