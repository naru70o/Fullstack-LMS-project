import User from "../models/user.model.js";

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