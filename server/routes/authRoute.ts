import express from 'express'
import type { Router } from 'express'
import {
  signinEmail,
  signupEmailAndPassword,
} from '@/controllers/betterAuthController.ts'
const authRouter: Router = express.Router()

// authRouter.route('/signup').post(signup)
// authRouter.route('/login').post(signin)
// authRouter.route('/logout').post(logout)
authRouter.route('/sign-up/email').post(signupEmailAndPassword)
authRouter.route('/sign-in/email').post(signinEmail)

export default authRouter

/*
{
    "name":"kadar naruto",
    "email":"kadar3@gmail.com",
    "password":"naruto6160"
}
*/
