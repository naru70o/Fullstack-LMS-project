import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createNewCourse, createNewModule, getAllCourses, getAllModules, createNewLecture, deleteCourse, deleteModule, getAlllactures, deleteallactures } from "../controllers/courseController.js";
import upload from "../utils/multer.js"
const courseRouter = express.Router();

courseRouter.route("/newcourse").post(protectRoute, upload.single("thumbnail"), createNewCourse)
courseRouter.route("/newmodule/:courseId").post(protectRoute, createNewModule)
courseRouter.route("/deletecourse/:courseId").delete(protectRoute, deleteCourse)
courseRouter.route("/deleteModule/:moduleId").delete(protectRoute, deleteModule)
courseRouter.route("/newlecture/:moduleId").post(protectRoute, upload.single("lecture"), createNewLecture)
courseRouter.route("/").get(getAllCourses)
courseRouter.route("/modules").get(getAllModules)
courseRouter.route("/lactures").get(getAlllactures)
courseRouter.route("/deletelactures").delete(deleteallactures)

export default courseRouter;