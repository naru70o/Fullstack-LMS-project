import bcrypt from "bcrypt";
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