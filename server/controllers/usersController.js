import User from "../models/user.model.js";
import AppError from "../utils/error.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        return res.status(200).json({
            status: "success",
            data: {
                users
            },
            message: "Users fetched successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

// update user's name 
export const updateProfile = async (req, res, next) => {
    console.log(req.user)
    const { name, email, bio } = req.body;
    try {
        const user = req.user;
        const updatedUser = await User.findByIdAndUpdate(user._id, { name, email, bio }, { new: true });
        if (!updatedUser) {
            return next(
                new AppError(
                    "User not found",
                    404
                )
            )
        }
        // console.log(updateProfile)
        return res.status(200).json({
            status: "success",
            data: {
                updatedUser
            },
            message: "User updated successfully"
        })
    } catch (error) {
        return next(
            new AppError(
                "Something went wrong",
                500
            )
        )
    }
}

// update user password

export const changepassword = async (req, res, next) => {
    // getting the password inputs
    const { oldpassword, password, passwordConfirm } = req.body;
    try {
        const email = req.user.email
        const user = await User.findOne({ email }).select("+password")

        console.log(user)
        if (!user) {
            return next(
                new AppError(
                    "User not found",
                    404
                )
            )
        }

        // checking if the password is correct
        const isPasswordCorrect = await user.comparePassword(oldpassword, user.password)
        if (!isPasswordCorrect) {
            return next(
                new AppError(
                    "Incorrect password",
                    400
                )
            )
        }

        // change the password
        await user.updatePassword(password, passwordConfirm);

        return res.status(200).json({
            status: "success",
            message: "password updated successfully"
        })

    } catch (error) {
        console.log(error)
        return next(
            new AppError("internal server error", 500)
        )
    }
}