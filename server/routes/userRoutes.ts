import upload from "../utils/multer.ts";
import type { Router } from "express";

import { forgetPassword, resetPassword } from "../controllers/authController.ts";
import express from "express";
import { getAllUsers, updateProfile, changepassword, updateProfileImage, changeUserRole } from "../controllers/usersController.ts";
import { protectRoute } from "../middlewares/protectRoute.ts"

const userRouter: Router = express.Router()

userRouter.patch("/forgetpassword", forgetPassword)
userRouter.route("/resetpassword/:token").patch(resetPassword)
userRouter.route("/updateprofile").patch(protectRoute, updateProfile)
userRouter.route("/changepassword").patch(protectRoute, changepassword)
userRouter.route("/updateprofilepicture").patch(protectRoute, upload.single("profile"), updateProfileImage)
userRouter.route("/updaterole").post(protectRoute, changeUserRole)
userRouter.route("/").get(protectRoute, getAllUsers)

export default userRouter;