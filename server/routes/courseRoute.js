import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createNewCourse } from "../controllers/courseController.js";
import upload from "../utils/multer.js"
const courseRouter = express.Router();

courseRouter.route("/newcourse").post(protectRoute, upload.single("thumbnail"), createNewCourse)

export default courseRouter;