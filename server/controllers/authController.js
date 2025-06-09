import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import generateToken from "../utils/jsonWebTokens.js";
import sendEmail from "../utils/email.js";
import appError from "../utils/error.js";


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check user is signedup
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(401).json({
                success: false,
                message: "user already exists please log in"
            })
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        generateToken(res, user, "user created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // user Exist
        const user = await User.findOne({ email }).select("+password")
        console.log(user.password)

        // checking if the password is correct
        const verified = await user.comparePassword(password, user.password)
        if (!user || !verified) {
            return res.status(400).json({
                status: 401,
                message: "invalid credentials"
            })
        }


        // token generated
        generateToken(res, user, "login successful")

    } catch (error) {
        console.error(error)
    }
}

// logout
export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            maxAage: 0,

        })
        return res.status(200).json({
            success: true,
            message: "logout successful"
        })
    } catch (error) {
        console.log(error)
    }
}

// forget password
export const forgetPassword = async (req, res) => {
    //1 get the user based on a posted email
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return next(appError("user not found", 404))
        }

        //2 Generate random token
        const resetToken = user.getResetPasswordToken()
        console.log(resetToken)
        await user.save({ validateBeforeSave: false })

        //3 send the token token via email;
        const resetUrl = `${req.protocol}//${req.get("host")}/api/v1/user/forgetpassword/${resetToken}`
        // FORGET PASSWORD MESSAGE
        const message = `Forget your password ? Confirm your password ${resetUrl}`

        try {
            await sendEmail({
                email: user.email,
                subject: message,
            })

            res.status(200).json({
                success: true,
                message: "token sent to email"
            })
        } catch (error) {
            user.resetPasswordTaken = undefined
            user.resetPasswordExpireDate = undefined
            await user.save({ validateBeforeSave: false })
            next(appError("email could not be sent", 500))
        }

    } catch (err) {
        console.log(err)
        return next(
            appError(err.message, 500)
        )
    }
}

// reset password
export const resetPassword = async (req, res) => {
    return null
}