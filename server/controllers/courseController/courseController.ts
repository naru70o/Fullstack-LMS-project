import type { Request, Response, NextFunction } from "express"
import AppError from "../../utils/error.ts";
import Course from "../../models/course.model.js"

// get all courses
export async function getAllCourses(req:Request, res:Response, next:NextFunction) {
    try {
        const courses = await Course.find().populate("instructor");
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
                `internal server error while fetching courses ${error.message}`,
                500
            )
        )
    }
}
// get a course
export async function getCourse(req,res,next) {
// getting the course Id  
const {courseId}= req.params
if(!courseId){
    return next(new AppError("Course ID is required", 400));
}

  try {
   const course =  await Course.findById(courseId).populate({path:"modules",
    populate:{
        path:"lectures"
    }
   }).populate("instructor");
   if (!course) {
    return next(
    new AppError("no course found with this id",404)
    )
  } 
  console.log(course)
  res.status(200).json({
   message:"here is your course",
   data : course,
  })
  } catch (error) {
    return next(`internal server error while getting a course ${error.message}`,500)
  }
}

// create a new course
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
                `internal server error while creating course : ${error.message}`,
                500
            )
        )
    }
}

// delete a course
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
                `internal server error while deleting course : ${error.message}`,
                500
            )
        )

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
        return next(new AppError(
                `internal server error while updating course : ${error.message}`,
                500
            ));
    }
}