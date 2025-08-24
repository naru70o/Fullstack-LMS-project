import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import AppError from "../utils/error.ts";
import type { Request, Response, NextFunction } from "express";

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
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
        const secret = process.env["SECRET"];
        if (!secret) {
            return next(new AppError("secret not found", 500));
        }
        const decoded = await jwt.verify(token, secret);
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
        console.log("user is authenticated", currentUser)
        req.user = currentUser;
        next()
    } catch (error) {
        if (error instanceof AppError) {
            return next(new AppError(error.message, 401))
        }
    }
}