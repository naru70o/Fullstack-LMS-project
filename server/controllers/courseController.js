// Todos
// 1 CRUD a course
// 2 using a virtuals and methods to make the code alot cleaner
// important fields, title , dis , level ,  category , thumplain 

import Course from "../models/course.model.js"
import Module from "../models/module.model.js"
import { uploadImage } from "../utils/cloudinary.js"
import AppError from "../utils/error.js"

// Get all courses
export async function getAllCourses(req, res, next) {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            status: "success",
            data: {
                courses
            },
            message: "courses fetched successfully"
        })
    } catch (error) {
        return next(
            new AppError(
                "internal server error",
                500
            )
        )
    }
}

export async function createNewCourse(req, res, next) {
    //1) getting the fields from the body
    const { title, description, level, category } = req.body

    //2) getting the Image from multer
    const thumbnail = req.file
    if (!thumbnail) {
        return next(
            "no file uploaded",
            400
        )
    }

    try {
        //3) getting the user
        const user = req.user
        if (!user.roles.includes("instructor")) {
            return next(
                new AppError(
                    "you are not an instructor",
                    403
                )
            )
        }

        if (!user) return next(
            new AppError(
                "user not found",
                404
            )
        )

        //4) uploading the thumblain to cloudinary
        const { public_id, secure_url } = await uploadImage(thumbnail.buffer)
        console.log(public_id, secure_url)
        if (!public_id || !secure_url) {
            return next(
                "internal server error",
                500
            )
        }

        //5) saving the data in the db
        const course = await Course.create({
            title,
            description,
            level,
            category,
            thumbnail: {
                public_id,
                secure_url
            },
            instructor: user._id
        })
        console.log(course)

        return res.status(200).json({
            status: "sucess",
            data: {
                course
            },
            message: "course created successfully"
        })
    } catch (error) {
        return next(
            new AppError(
                "internal server error",
                500
            )
        )
    }
}

// TODO, create new module for a course
export async function createNewModule(req, res, next) {
    // get the modules course id
    const { courseId } = req.params
    if (!courseId) return next(
        new AppError(
            "course id is required",
            400
        )
    )
    // get the module fields
    const { title, description } = req.body
    if (!title || !description) return next(
        new AppError(
            "title and description are required",
            400
        )
    )
    try {
        // Finding the course to get the current number of modules
        const course = await Course.findById(courseId).populate('modules');
        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        // Determine the order for the new module
        const newOrder = course.modules.length + 1;

        // save the module
        const module = await Module.create({
            title,
            description,
            course: courseId,
            order: newOrder,
        })
        // Adding the new module to the course's modules array
        await Course.findByIdAndUpdate(courseId, { $push: { modules: module._id } });

        return res.status(200).json({
            status: "success",
            data: {
                module
            },
            message: "module created successfully"
        })
    } catch (error) {
        return next(
            new AppError(
                "internal server error",
                500
            )
        )
    }
}