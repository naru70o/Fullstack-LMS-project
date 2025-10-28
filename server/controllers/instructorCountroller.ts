import prisma from '@/lib/prisma.ts'
import AppError from '@/utils/error.ts'
import type { User } from '@/utils/types.ts'
import type { NextFunction, Request, Response } from 'express'

export async function registerInstructor(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  try {
    //1 get the body
    const {
      occupation,
      specificSkills,
      yearsOfExpertise,
      qualification,
      termsAndConditions,
      equipment,
      sampleContentUrl,
    } = req.body

    //2 get the user session
    const user: User | undefined = req.user
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      })
    }

    //3 check if he is already registered
    const isRegistered = await prisma.instructor.findUnique({
      where: { userId: user.id },
    })
    if (isRegistered !== null) {
      return res.status(400).json({
        status: 'error',
        message: 'User already registered',
      })
    }

    //4 post the instructor form
    const instructor = await prisma.instructor.create({
      data: {
        expertise: occupation,
        specificSkillsToTeach: specificSkills,
        yearsOfExperience: yearsOfExpertise,
        qualifications: qualification,
        guidelinesReviewed: termsAndConditions,
        hasEquipment: equipment,
        sampleContentUrl: sampleContentUrl,
        userId: user.id,
      },
    })

    //5 update the user role as an instructor
    await prisma.user.update({
      where: { id: user.id },
      data: { roles: { push: 'instructor' } },
    })

    return res.status(201).json({
      status: 'success',
      data: instructor,
      message: 'Instructor registered successfully',
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}

// test: getting the all instructors
// will be removed later
export async function getAllInstructors(_req, res, next) {
  try {
    const instructors = await prisma.instructor.findMany()
    console.warn('do not forget to remove this route')
    return res.status(200).json({
      status: 'success',
      data: instructors,
    })
  } catch (error) {
    return next(new AppError('Something went wrong', 500))
  }
}
