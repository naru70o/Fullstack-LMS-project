import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createNewCourse, createNewModule, getAllCourses } from "../controllers/courseController.js";
import upload from "../utils/multer.js"
const courseRouter = express.Router();

courseRouter.route("/newcourse").post(protectRoute, upload.single("thumbnail"), createNewCourse)
courseRouter.route("/newmodule/:courseId").post(protectRoute, createNewModule)
courseRouter.route("/").get(getAllCourses)

export default courseRouter;