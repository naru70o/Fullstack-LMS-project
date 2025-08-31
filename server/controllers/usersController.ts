import prisma from '@/lib/prisma.ts'
import { uploadImage } from '../utils/cloudinary.ts'
import AppError from '../utils/error.ts'
import type { Request, Response, NextFunction } from 'express'
import { auth } from '@/lib/auth.ts'
import { fromNodeHeaders } from 'better-auth/node'

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany()
    console.log(users)
    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
      message: 'Users fetched successfully',
    })
  } catch (error) {
    console.log(error)
    return next(new AppError('Internal server error', 500))
  }
}

// update user's name
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.user)
  const { name, bio } = req.body
  try {
    const user = req.user
    if (!user) {
      return next(new AppError('User not found', 404))
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name, bio },
    })
    if (!updatedUser) {
      return next(new AppError('User not found', 404))
    }
    // console.log(updateProfile)
    return res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
      message: 'User updated successfully',
    })
  } catch (error) {
    return next(new AppError('Something went wrong', 500))
  }
}

// update a user's role to student
export async function changeUserRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // getting fields
  const { role } = req.body

  try {
    // getting the current user
    const user = req.user
    if (!user) {
      return next(new AppError('User not found', 404))
    }
    // Add the new role to the existing roles array, preventing duplicates

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { roles: { push: role } },
    })

    if (!updatedUser) {
      return next(new AppError('Failed to update user role', 500))
    }

    return res.status(200).json({
      status: 'succes',
      data: updatedUser,
      message: 'user role updated successfully',
    })
  } catch (error) {
    return next(new AppError('Something went wrong', 500))
  }
}

// change user password
export async function changepassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // getting the password inputs
  const { oldpassword, password } = req.body
  try {
    await auth.api.changePassword({
      body: {
        newPassword: password, // required
        currentPassword: oldpassword, // required
        revokeOtherSessions: true,
      },
      // This endpoint requires session cookies.
      headers: fromNodeHeaders(req.headers),
    })
    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    })
  } catch (error) {
    return next(new AppError('Internal Server Error', 500))
  }
}

// update user's profile picture
export const updateProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //1 getting the image from the req.file becouse of multer middleware running
  const profile = req.file
  if (!profile) {
    return next(new AppError('No file uploaded', 400))
  }
  console.log(profile)
  try {
    if (!profile) {
      return next(new AppError('No file uploaded', 400))
    }
    //2 uploading the image to cloudinary
    const user = req.user
    if (!user) {
      return next(new AppError('User not found', 404))
    }
    const uploadImageResult = await uploadImage(profile.buffer)
    const { public_id } = uploadImageResult || {}
    console.log('this is the public_ID', public_id)

    if (!public_id) {
      return next(new AppError('Image upload failed', 500))
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: public_id },
    })

    if (!updatedUser) {
      return next(new AppError('User not found', 404))
    }

    return res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
      message: 'User updated successfully',
    })
  } catch (err) {
    return next(new AppError('Something went wrong', 500))
  }
}

/*
// update user password
export const changepassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // getting the password inputs
  const { oldpassword, password, passwordConfirm } = req.body
  console.warn(
    "Warning: 'authController.ts' is deprecated and will be removed in a future release. Please use 'newModule.js' instead.",
  )

  try {
    const email = req.user.email
    const user = await User.findOne({ email }).select('+password')

    console.log(user)
    if (!user) {
      return next(new AppError('User not found', 404))
    }

    // checking if the password is correct
    const isPasswordCorrect = await user.comparePassword(
      oldpassword,
      user.password,
    )
    if (!isPasswordCorrect) {
      return next(new AppError('Incorrect password', 400))
    }

    // change the password
    await user.updatePassword(password, passwordConfirm)

    return res.status(200).json({
      status: 'success',
      message: 'password updated successfully',
    })
  } catch (error) {
    console.log(error)
    return next(new AppError('internal server error', 500))
  }
}
*/
