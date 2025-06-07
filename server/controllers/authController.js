import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import generateToken from "../utils/jsonWebTokens.js";

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

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // user Exist
        const user = await User.findOne({ email }).select("+password")

        // checking if the password is correct
        if (!user || !await User.comparePassword(user.password, password)) {
            return res.status(400).json({
                status: 400,
                message: "user does not exist"
            })
        }


        // token generated
        generateToken(res, user, "login successful")

    } catch (error) {
        console.error(error)
    }
}