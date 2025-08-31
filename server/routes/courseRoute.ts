import express from 'express'
import type { Router } from 'express'
import { session } from '../middlewares/sessionMiddleWare.ts'
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
  deleteAllLectures,
} from '../controllers/courseController/lectureController.ts'
import { askQuestion } from '../controllers/courseController/questionController.ts'
import upload from '../utils/multer.ts'
const courseRouter: Router = express.Router()

courseRouter
  .route('/newcourse')
  .post(session, upload.single('thumbnail'), createNewCourse)
courseRouter
  .route('/updatecourse/:courseId')
  .patch(session, upload.single('thumbnail'), updateCourse)
courseRouter.route('/updatemodule/:moduleId').patch(session, updateModule)
courseRouter
  .route('/updatelecture/:lectureId')
  .patch(session, upload.single('lecture'), updateLecture)
courseRouter.route('/newmodule/:courseId').post(session, createNewModule)
courseRouter.route('/deletecourse/:courseId').delete(session, deleteCourse)
courseRouter.route('/deleteModule/:moduleId').delete(session, deleteModule)
courseRouter.route('/deletelacture/:lactureId').delete(session, deleteLacture)
courseRouter
  .route('/newlecture/:moduleId')
  .post(session, upload.single('lecture'), createNewLecture)
courseRouter.route('/').get(session, getAllCourses)
courseRouter.route('/:courseId').get(getCourse)
courseRouter.route('/modules').get(getAllModules)
courseRouter.route('/lectures').get(getAllLectures)
courseRouter.route('/deletelectures').delete(deleteAllLectures)

// Questions and Answers
courseRouter
  .route('/lecture/:lectureId/question')
  .post(session, upload.single('questionImage'), askQuestion)

export default courseRouter
