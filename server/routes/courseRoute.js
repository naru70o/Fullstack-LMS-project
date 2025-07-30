import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createNewCourse, createNewModule, getAllCourses, getAllModules, createNewLecture, deleteCourse, deleteModule, getAlllactures, deleteallactures, deleteLacture, updateCourse, updateModule, updateLecture, askQuestion , getCourse, getModulesByCourseId } from "../controllers/courseController.js";
import upload from "../utils/multer.js"
import { get } from "mongoose";
const courseRouter = express.Router();

courseRouter.route("/newcourse").post(protectRoute, upload.single("thumbnail"), createNewCourse)
courseRouter.route("/updatecourse/:courseId").patch(protectRoute, upload.single("thumbnail"), updateCourse)
courseRouter.route("/updatemodule/:moduleId").patch(protectRoute, updateModule)
courseRouter.route("/updatelecture/:lectureId").patch(protectRoute, upload.single("lecture"), updateLecture)
courseRouter.route("/newmodule/:courseId").post(protectRoute, createNewModule)
courseRouter.route("/deletecourse/:courseId").delete(protectRoute, deleteCourse)
courseRouter.route("/deleteModule/:moduleId").delete(protectRoute, deleteModule)
courseRouter.route("/deletelacture/:lactureId").delete(protectRoute, deleteLacture)
courseRouter.route("/newlecture/:moduleId").post(protectRoute, upload.single("lecture"), createNewLecture)
courseRouter.route("/").get(getAllCourses) 
courseRouter.route("/:courseId").get(getCourse)
courseRouter.route("/modules").get(getAllModules)
courseRouter.route("/modules/:courseId").get(getModulesByCourseId)
courseRouter.route("/lactures").get(getAlllactures)
courseRouter.route("/deletelactures").delete(deleteallactures)

// Questions and Answers
courseRouter.route("/lecture/:lectureId/question").post(protectRoute, upload.single("questionImage"), askQuestion);

export default courseRouter;
