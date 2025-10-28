import {
  getAllInstructors,
  registerInstructor,
} from '@/controllers/instructorCountroller.ts'
import { session } from '@/middlewares/sessionMiddleWare.ts'
import type { Router } from 'express'
import express from 'express'

const InstructorRouter: Router = express.Router()

InstructorRouter.route('/register').post(session, registerInstructor)
InstructorRouter.route('/instructors').get(getAllInstructors)

export default InstructorRouter
