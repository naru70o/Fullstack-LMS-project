import upload from '../utils/multer.ts'
import type { Router } from 'express'

import { forgetPassword, resetPassword } from '../controllers/authController.ts'
import express from 'express'
import {
  getAllUsers,
  updateProfile,
  changepassword,
  updateProfileImage,
  changeUserRole,
} from '../controllers/usersController.ts'
import { session } from '../middlewares/sessionMiddleWare.ts'

const userRouter: Router = express.Router()

userRouter.patch('/forgetpassword', forgetPassword)
userRouter.route('/resetpassword/:token').patch(resetPassword)
userRouter.route('/updateprofile').patch(session, updateProfile)
userRouter.route('/changepassword').patch(session, changepassword)
userRouter
  .route('/updateprofilepicture')
  .patch(session, upload.single('profile'), updateProfileImage)
userRouter.route('/updaterole').post(session, changeUserRole)
userRouter.route('/').get(session, getAllUsers)

export default userRouter
