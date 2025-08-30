import express from 'express'
import type { Router } from 'express'
import { protectRoute } from '../middlewares/protectRoute.ts'
import {
  getAllCourses,
  deleteCourse,
  updateCourse,
  createNewCourse,
  getCourse,
} from '../controllers/courseController/courseController.ts'
import {
  createNewModule,
  deleteModule,
  updateModule,
  getAllModules,
} from '../controllers/courseController/moduleController.ts'
import {
  createNewLecture,
  deleteLacture,
  updateLecture,
  getAllLectures,
  deleteallactures,
} from '../controllers/courseController/lectureController.ts'
import { askQuestion } from '../controllers/courseController/questionController.ts'
import upload from '../utils/multer.ts'
import { session } from '@/middlewares/sessionMiddleWare.ts'
const courseRouter: Router = express.Router()

courseRouter
  .route('/newcourse')
  .post(protectRoute, upload.single('thumbnail'), createNewCourse)
courseRouter
  .route('/updatecourse/:courseId')
  .patch(protectRoute, upload.single('thumbnail'), updateCourse)
courseRouter.route('/updatemodule/:moduleId').patch(protectRoute, updateModule)
courseRouter
  .route('/updatelecture/:lectureId')
  .patch(protectRoute, upload.single('lecture'), updateLecture)
courseRouter.route('/newmodule/:courseId').post(protectRoute, createNewModule)
courseRouter.route('/deletecourse/:courseId').delete(protectRoute, deleteCourse)
courseRouter.route('/deleteModule/:moduleId').delete(protectRoute, deleteModule)
courseRouter
  .route('/deletelacture/:lactureId')
  .delete(protectRoute, deleteLacture)
courseRouter
  .route('/newlecture/:moduleId')
  .post(protectRoute, upload.single('lecture'), createNewLecture)
courseRouter.route('/').get(session, getAllCourses)
courseRouter.route('/:courseId').get(getCourse)
courseRouter.route('/modules').get(getAllModules)
courseRouter.route('/lectures').get(getAllLectures)
courseRouter.route('/deletelectures').delete(deleteallactures)

// Questions and Answers
courseRouter
  .route('/lecture/:lectureId/question')
  .post(protectRoute, upload.single('questionImage'), askQuestion)

export default courseRouter
