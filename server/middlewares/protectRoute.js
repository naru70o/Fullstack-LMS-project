// import { promisify } from "util"
import jwt from "jsonwebtoken"
import AppError from "../utils/error.js";

export async function routeProtector(req, res, next) {
    try {
        // Check if there is a token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(
                new AppError("can't find token", 401)
            )
        }

        // verify the token
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return next(new AppError("invalid token", 401))
        }
        req.user = user;
        next()
    }
    catch (error) {
        return next(new AppError(error.message, 401))
    }
}