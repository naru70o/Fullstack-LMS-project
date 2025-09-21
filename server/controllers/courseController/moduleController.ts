import prisma from '@/lib/prisma.ts'
import AppError from '@/utils/error.ts'
import { deleteMultipleLectureVideos } from '@/utils/helpers.ts'
import type { User } from '@/utils/types.ts'
import type { NextFunction, Request, Response } from 'express'

declare module 'express' {
  interface Request {
    user?: User
  }
}

// Get all modules
export async function getAllModules(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  try {
    console.log('Fetching all modules')
    const modules = await prisma.module.findMany({
      include: {
        lectures: true,
      },
    })
    if (!modules) {
      return res.status(404).json({
        message: 'No modules found',
        status: 'fail',
      })
    }
    return res.status(200).json({
      message: 'modules fetched successfully',
      status: 'success',
      data: {
        modules,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      status: 'error',
    })
  }
}

// update a module
export async function updateModule(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //1 getting the params
  const { moduleId } = req.params
  const { user } = req
  if (!moduleId) {
    return next(new AppError('Module ID is required', 400))
  }

  try {
    //2 find the module
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: { course: true },
    })
    if (!module) {
      return next(new AppError('Module not found', 404))
    }

    //3 find the course to verify instructor
    if (!module.course) {
      return next(new AppError('Associated course not found', 404))
    }

    //4 check if the user is the instructor of the course
    if (module.course.instructorId.toString() !== user?.id.toString()) {
      return next(
        new AppError('You are not authorized to update this module', 403),
      )
    }

    //5 get the fields to update from the body
    const { title, description, optional } = req.body
    const updates: {
      title?: string
      description?: string
      optional?: boolean
    } = {}
    if (title) updates.title = title
    if (description) updates.description = description
    if (optional !== undefined) updates.optional = optional

    //6 update the module
    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data: updates,
    })

    return res.status(200).json({
      status: 'success',
      data: { module: updatedModule },
      message: 'Module updated successfully',
    })
  } catch (error) {
    return next(
      new AppError(
        `Internal server error while updating module: ${error.message}`,
        500,
      ),
    )
  }
}

// TODO, create new module for a course
export async function createNewModule(
  req: Request<{ courseId: string }>,
  res: Response,
  next: NextFunction,
) {
  // get the modules course id
  const { courseId } = req.params
  if (!courseId) return next(new AppError('course id is required', 400))
  // get the module fields
  const { title, description } = req.body
  if (!title || !description)
    return next(new AppError('title and description are required', 400))
  try {
    // Finding the course to get the current number of modules
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { modules: true },
    })
    if (!course) {
      return next(new AppError('Course not found', 404))
    }

    // Determine the order for the new module
    const newOrder = course.modules.length + 1

    // save the module
    const module = await prisma.module.create({
      data: {
        title,
        description,
        course: { connect: { id: courseId } },
        order: newOrder,
      },
    })
    // Adding the new module to the course's modules array
    await prisma.course.update({
      where: { id: courseId },
      data: { modules: { connect: { id: module.id } } },
    })

    return res.status(200).json({
      status: 'success',
      data: {
        module,
      },
      message: 'module created successfully',
    })
  } catch (error) {
    return next(
      new AppError(
        `internal server error while creating module : ${error.message}`,
        500,
      ),
    )
  }
}

// delete module
export async function deleteModule(
  req: Request<{ moduleId: string }>,
  res: Response,
  next: NextFunction,
) {
  //1 getting the params
  const { moduleId } = req.params
  if (!moduleId) {
    return next(new AppError('module id is required', 400))
  }

  try {
    //2 check if the user exist
    const user = req.user
    if (!user) {
      return next(new AppError('user not found', 404))
    }

    //3 get the course and the instructor
    const course = await prisma.module.findUnique({
      where: { id: moduleId },
      include: { course: { include: { instructor: true } } },
    })

    if (!course) {
      return next(new AppError('course not found', 404))
    }

    //4 checking the if the user has the permition to delete
    if (user.id.toString() !== course.course.instructor.id.toString()) {
      return next(
        new AppError('you are not authorized to delete this module', 403),
      )
    }

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        lectures: true,
      },
    })
    const publicIds = module?.lectures.map((lecture) => lecture.publicId) || []
    const lecturesDuration =
      module?.lectures.reduce(
        (total, lecture) => total + lecture.duration,
        0,
      ) || 0

    //5.1 delete the lecture videos
    await deleteMultipleLectureVideos({ publicIds })

    // decrement the course duration
    await prisma.course.update({
      where: { id: course.course.id },
      data: { duration: { decrement: lecturesDuration } },
    })

    //5.2 decrement the total number of lectures
    const totalLectures = module?.lectures.length || 0
    await prisma.course.update({
      where: { id: course.course.id },
      data: { numberOfLectures: { decrement: totalLectures } },
    })

    //5.3 delete the module
    await prisma.module.delete({
      where: { id: moduleId },
    })

    return res.status(200).json({
      status: 'success',
      data: {
        module,
      },
      message: 'module deleted successfully',
    })
  } catch (error) {
    return next(
      new AppError(
        `internal server error while deleting module : ${error.message}`,
        500,
      ),
    )
  }
}
