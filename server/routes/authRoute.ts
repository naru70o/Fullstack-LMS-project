import express from "express";
import { signup, signin, logout } from "../controllers/authController.ts"
import type { Router } from "express";
const authRouter: Router = express.Router()


authRouter.route("/signup").post(signup)
authRouter.route("/login").post(signin)
authRouter.route("/logout").post(logout)

export default authRouter;

/*
{
    "name":"kadar naruto",
    "email":"kadar3@gmail.com",
    "password":"naruto6160"
}
*/