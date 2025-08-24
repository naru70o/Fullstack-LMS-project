import type { Request,Response,NextFunction } from "express";

import Lecture from "../../models/lacture.model.js"
import Module from "../../models/module.model.js"
import Course from "../../models/course.model.js"
import AppError from "../../utils/error.ts";
import {videoUploader} from "@/utils/cloudinary.ts";


// Get all Lectures
export async function getAllLectures(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await Lecture.find();
        return res.status(200).json({
            message: "lectures fetched successfully",
            status: "success",
            data: {
                response
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

//TODO creating a new lecture for a course
export async function createNewLecture(req: Request, res: Response, next: NextFunction) {
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
        const videoUploadResult = await videoUploader(lectureVideoFile.buffer);
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
        return next(new AppError(
                `internal server error while creating lecture : ${error.message}`,
                500
            ));
    }
}


// update a lecture
export async function updateLecture(req: Request, res: Response, next: NextFunction) {
    //1 getting the params
    const { lectureId } = req.params;
    if (!lectureId) {
        return next(new AppError("Lecture ID is required", 400));
    }

    try {
        //2 find the lecture
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return next(new AppError("Lecture not found", 404));
        }

        //3 find the module and course to verify instructor
        const module = await Module.findById(lecture.moduleId);
        if (!module) {
            return next(new AppError("Associated module not found", 404));
        }
        const course = await Course.findById(module.course);
        if (!course) {
            return next(new AppError("Associated course not found", 404));
        }

        //4 check if the user is the instructor of the course
        if (course.instructor.toString() !== req.user._id.toString()) {
            return next(new AppError("You are not authorized to update this lecture", 403));
        }

        //5 get the fields to update from the body
        const { title, description, isPreview } = req.body;
        const updates = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (isPreview !== undefined) updates.isPreview = isPreview;

        //6 handle video update if a new one is provided
        if (req.file) {
            const oldDuration = lecture.duration || 0;

            // Delete old video from Cloudinary
            if (lecture.publicId) {
                await lecture.deletelactureVedio();
            }

            // Upload new video
            const videoUploadResult = await videoUploader(req.file.buffer);
            if (!videoUploadResult || !videoUploadResult.public_id || !videoUploadResult.secure_url) {
                return next(new AppError("Failed to upload new video", 500));
            }

            // Update lecture fields
            updates.url = { videoUrl: videoUploadResult.secure_url, secureUrl: videoUploadResult.secure_url };
            updates.publicId = videoUploadResult.public_id;
            updates.duration = videoUploadResult.duration || 0;

            // Update course total duration
            const durationDifference = updates.duration - oldDuration;
            await Course.findByIdAndUpdate(course._id, { $inc: { totalOfHours: durationDifference } });
        }

        //7 update the lecture
        const updatedLecture = await Lecture.findByIdAndUpdate(lectureId, { $set: updates }, { new: true, runValidators: true });

        return res.status(200).json({
            status: "success",
            data: { lecture: updatedLecture },
            message: "Lecture updated successfully"
        });
    } catch (error) {
        return next(new AppError(`Internal server error while updating lecture: ${error.message}`, 500));
    }
}

// delete all lactures
export async function deleteallactures(req: Request, res: Response, next: NextFunction) {
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

// Delete a single lecture
export async function deleteLacture(req: Request, res: Response, next: NextFunction) {
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
        return next(new AppError(
                `internal server error while deleting lecture : ${error.message}`,
                500
            ));
    }
}
