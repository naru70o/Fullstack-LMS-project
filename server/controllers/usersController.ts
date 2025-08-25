import User from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.ts"
import AppError from "../utils/error.ts";
import type { Request,Response,NextFunction } from "express";

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
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
        return next(new AppError("Internal server error", 500));
    }
}

// update user's name 
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
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

// update a user's role to student
export async function changeUserRole(req: Request, res: Response, next: NextFunction) {
    // getting fields
    const { role } = req.body

    try {

        // getting the current user
        const user = req.user
        if (!user) {
            return next(
                new AppError(
                    "User not found",
                    404
                )
            )
        }
        // Add the new role to the existing roles array, preventing duplicates
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { roles: role } }, // Use $addToSet to add the new role
            { new: true, runValidators: true } // runValidators to ensure the role is valid per your enum
        );

        if (!updatedUser) {
            return next(new AppError("Failed to update user role", 500));
        }

        return res.status(200).json({
            status: 'succes',
            data: updatedUser,
            message: 'user role updated successfully'
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
export const changepassword = async (req: Request, res: Response, next: NextFunction) => {
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

// update user's profile picture
export const updateProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    //1 getting the image from the req.file becouse of multer middleware running
    const profile = req.file
    if (!profile) {
        return next(
            new AppError(
                "No file uploaded",
                400
            )

        )
    }
    console.log(profile)
    try {
        if (!profile) {
            return next(
                new AppError(
                    "No file uploaded",
                    400
                )
            )
        }
        //2 uploading the image to cloudinary
        const user = req.user;
        const uploadImageResult  = await uploadImage(profile.buffer)
        const { public_id } = uploadImageResult || {}
        console.log("this is the public_ID", public_id)
        const updatedUser = await User.findByIdAndUpdate(user._id, { profile: public_id }, { new: true });
        if (!updatedUser) {
            return next(
                new AppError(
                    "User not found",
                    404
                )
            )
        }
        return res.status(200).json({
            status: "success",
            data: {
                updatedUser
            },
            message: "User updated successfully"
        })
    } catch (err) {
        return next(
            new AppError(
                "Something went wrong",
                500
            )
        )

    }
}