// import { promisify } from "util"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import AppError from "../utils/error.js";

export async function protectRoute(req, res, next) {
    try {
        // Check if there is a token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        console.log("this is the token", token)
        if (!token) {
            return next(
                new AppError("can't find token", 401)
            )
        }

        // verify the token
        const decoded = await jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return next(new AppError("invalid token", 401))
        }

        // checking if user still exists
        const currentUser = await User.findById(decoded.userId)
        if (!currentUser) {
            return next(new AppError("user not found", 401))
        }

        // check if user changed password after Token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError("user recently changed password", 401))
        }

        // grant access to the user
        req.user = currentUser;
        next()
    }
    catch (error) {
        return next(new AppError(error.message, 401))
    }
}