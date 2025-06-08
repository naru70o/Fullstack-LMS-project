import express from "express";
import { signup, signin } from "../controllers/authController.js"
import { routeProtector } from "../middlewares/protectRoute.js";
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
authRouter.route("/login").post(signin)
authRouter.route("/logout").get(test).post(routeProtector, test)
authRouter.route("/test").get(routeProtector, test)

export default authRouter;

/*
{
    "name":"kadar naruto",
    "email":"kadar3@gmail.com",
    "password":"naruto6160"
}
*/