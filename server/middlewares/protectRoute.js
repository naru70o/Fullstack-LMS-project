import { promisify } from "util"
import jwt from "jsonwebtoken"

export async function routeProtector(req, res, next) {
    try {
        // Check if there is a token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            next(
                res.status(401).json({
                    status: "failed",
                    message: "can't find token"
                })
            )
        }

        // verify the token
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next()
    }
    catch (error) {
        console.log("error in route protector", error.message)
    }
}