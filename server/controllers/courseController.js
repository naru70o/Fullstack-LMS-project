// Todos
// 1 CRUD a course
// 2 using a virtuals and methods to make the code alot cleaner

import Course from "../models/course.model.js"
import Module from "../models/module.model.js"
import Lecture from "../models/lacture.model.js"
import { deleteImage, uploadImage, vedeoUploader } from "../utils/cloudinary.js"
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

// Get all modules
export async function getAllModules(req, res, next) {
    try {
        const modules = await Module.find();
        return res.status(200).json({
            message: "modules fetched successfully",
            status: "success",
            data: {
                modules
            },
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

// Get all Lactures
export async function getAlllactures(req, res, next) {
    try {
        const lectures = await Lecture.find();
        return res.status(200).json({
            message: "lectures fetched successfully",
            status: "success",
            data: {
                lectures
            },
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

// delete all lactures
export async function deleteallactures(req, res, next) {
    try {
        await Lecture.deleteMany();
        return res.status(200).json({
            message: "lectures deleted successfully",
            status: "success",
        })
    } catch (error) {
        return next(
            new AppError("internal server error", 500)
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

//TODO creating a new lecture for a course
export async function createNewLecture(req, res, next) {
    //1) Getting the moduleId from params
    const { moduleId } = req.params;
    if (!moduleId) {
        return next(new AppError("Module ID is required", 400));
    }

    //2) Getting the fields from the body
    const { title, description } = req.body
    if (!title || !description) {
        return next(new AppError("Title and description are required for the lecture", 400));
    }

    //3) Checking the user (instructor)
    const user = req.user;
    console.log(user.roles)
    if (!user.roles.includes("instructor")) {
        return next(new AppError("User not found, please login", 404));
    }

    try {
        //4) Getting the video file from multer
        const lectureVideoFile = req.file;
        if (!lectureVideoFile) {
            return next(
                new AppError(
                    "No lecture video file uploaded",
                    400
                )
            );
        }

        //5) Uploading the video to Cloudinary
        const videoUploadResult = await vedeoUploader(lectureVideoFile.buffer);
        if (!videoUploadResult || !videoUploadResult.public_id || !videoUploadResult.secure_url) {
            return next(new AppError("Failed to upload video to Cloudinary", 500));
        }

        //6) Finding the module to get the current number of lectures for order
        const module = await Module.findById(moduleId).populate('lectures');
        if (!module) {
            return next(new AppError("Module not found", 404));
        }

        // Determine the order for the new lecture
        const newOrder = module.lectures.length + 1;

        //7) Creating the new lecture
        const newLecture = await Lecture.create({
            title,
            description,
            url: {
                videoUrl: videoUploadResult.secure_url, // Cloudinary secure URL
                secureUrl: videoUploadResult.secure_url // Cloudinary secure URL
            },
            moduleId: moduleId,
            instructor: user._id,
            duration: videoUploadResult.duration || 0,
            publicId: videoUploadResult.public_id, // Cloudinary public ID
            order: newOrder,
        });

        //8) Adding the new lecture to the module's lectures array
        await Module.findByIdAndUpdate(moduleId, { $push: { lectures: newLecture._id } });

        //9) Updating the course's numberOfLectures and totalOfHours
        await Course.findByIdAndUpdate(module.course, {
            $inc: { numberOfLectures: 1, totalOfHours: newLecture.duration }
        });

        //10) save the lecture
        await newLecture.save();

        return res.status(200).json({
            status: "success",
            data: {
                lecture: newLecture
            },
            message: "Lecture created and added to module successfully"
        });
    } catch (error) {
        // return next(new AppError("Internal server error while creating lecture", 500));
        console.error("Error creating new lecture:", error.message);
        return next(error)
    }
}

///////////////////////////
///////////////////////////
///////// DELETE OPERATIONS

export async function deleteCourse(req, res, next) {
    //1 getting the params
    const { courseId } = req.params
    if (!courseId) {
        return next(
            new AppError(
                "course id is required",
                400
            )
        )
    }

    try {
        //2 check if the user exist
        const user = req.user
        if (!user) {
            return next(
                new AppError(
                    "user not found",
                    404
                )
            )
        }
        //3 get the course
        const course = await Course.findOne({ _id: courseId }).populate("instructor");
        console.log("here is the course", typeof course)
        if (!course) {
            return next(
                new AppError(
                    "course not found",
                    404
                )
            )
        }


        //4 checking if the course has the id of the current instructor
        const isCorrect = course.instructor.id.toString() === user.id.toString()
        if (!isCorrect) {
            return next(
                new AppError(
                    "you are not authorized to delete this course",
                    403
                )
            )
        }

        //5 delete the course
        const deletedCourse = await Course.findByIdAndDelete(course._id)
        //4 delete the course thumblain
        await deleteImage(deletedCourse.thumbnail.public_id)

        return res.status(200).json({
            status: "success",
            data: {
                course
            },
            message: "course deleted successfully",
        })

    } catch (error) {
        console.error("Error in deleteCourse controller:", error);
        return next(
            new AppError(
                "internal server error when deleting course",
                500
            )
        )

    }

}

// delete module
export async function deleteModule(req, res, next) {
    //1 getting the params
    const { moduleId } = req.params
    if (!moduleId) {
        return next(
            new AppError("module id is required", 400)
        )
    }

    try {
        //2 check if the user exist
        const user = req.user
        if (!user) {
            return next(
                new AppError(
                    "user not found",
                    404
                ))
        }

        //3 get the course and then the instructor
        const course = await Course.findOne({ modules: moduleId }).populate("instructor");
        if (!course) {
            return next(
                new AppError("course not found", 404)
            )
        }

        //4 checking the if the user has the permition to delete
        if (!user.id.toString() === course.instructor.id.toString()) {
            return next(
                new AppError("you are not authorized to delete this module", 403)
            )
        }

        const module = await Module.find({ _id: moduleId });

        //5 delete the module
        await Module.findByIdAndDelete(moduleId)

        return res.status(200).json({
            status: "success",
            data: {
                module
            },
            message: "module deleted successfully"
        })
    } catch (error) {
        return next(`internal server error while deleting module ${error.message}`, 500)
    }

}

// Delete a single lecture
export async function deleteLacture(req, res, next) {
    const { lactureId } = req.params;
    if (!lactureId) {
        return next(new AppError("Lecture ID is required", 400));
    }

    try {
        const user = req.user;
        if (!user) {
            return next(new AppError("User not found, please login", 404));
        }

        const lecture = await Lecture.findById(lactureId).populate('instructor');
        if (!lecture) {
            return next(new AppError("Lecture not found", 404));
        }

        // Check if the user is authorized to delete this lecture
        if (!lecture.instructor || lecture.instructor._id.toString() !== user._id.toString()) {
            return next(new AppError("You are not authorized to delete this lecture", 403));
        }

        // 1. Delete the video from Cloudinary
        await lecture.deletelactureVedio();

        // 2. Delete the lecture document from the database
        await Lecture.findByIdAndDelete(lactureId);

        // 3. Remove lecture reference from the parent module
        const parentModule = await Module.findByIdAndUpdate(
            lecture.moduleId,
            { $pull: { lectures: lecture._id } },
            { new: true }
        );

        // 4. Update course's numberOfLectures and totalOfHours
        if (parentModule && parentModule.course) {
            await Course.findByIdAndUpdate(parentModule.course, {
                $inc: {
                    numberOfLectures: -1,
                    totalOfHours: -(lecture.duration || 0)
                }
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Lecture deleted successfully",
        });

    } catch (error) {
        return next(new AppError(`Internal server error while deleting lecture: ${error.message}`, 500));
    }
}

// update a course
export async function updateCourse(req, res, next) {
    //1 getting the params

    const { courseId } = req.params;
    if (!courseId) {
        return next(new AppError("Course ID is required", 400));
    }

    try {
        //2 find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        //3 check if the user is the instructor of the course
        if (course.instructor.toString() !== req.user._id.toString()) {
            return next(new AppError("You are not authorized to update this course", 403));
        }

        //4 get the fields to update from the body
        const { title, description, level, category } = req.body;
        const updates = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (level) updates.level = level;
        if (category) updates.category = category;

        //5 handle thumbnail update if a new one is provided
        if (req.file) {
            // Delete old thumbnail
            if (course.thumbnail && course.thumbnail.public_id) {
                await deleteImage(course.thumbnail.public_id);
            }
            // Upload new thumbnail
            const { public_id, secure_url } = await uploadImage(req.file.buffer);
            if (!public_id || !secure_url) {
                return next(new AppError("Failed to upload new thumbnail", 500));
            }
            updates.thumbnail = { public_id, secure_url };
        }

        //6 update the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $set: updates }, { new: true, runValidators: true });

        return res.status(200).json({
            status: "success",
            data: { course: updatedCourse },
            message: "Course updated successfully"
        });
    } catch (error) {
        return next(new AppError(`Internal server error while updating course: ${error.message}`, 500));
    }
}
