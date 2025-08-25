import Module from '../../models/module.model.js'

// Get all modules
export async function getAllModules(req, res, next) {
  try {
    const modules = await Module.find()
    return res.status(200).json({
      message: 'modules fetched successfully',
      status: 'success',
      data: {
        modules,
      },
    })
  } catch (error) {
    return next(new AppError('internal server error', 500))
  }
}

// update a module
export async function updateModule(req, res, next) {
  //1 getting the params
  const { moduleId } = req.params
  if (!moduleId) {
    return next(new AppError('Module ID is required', 400))
  }

  try {
    //2 find the module
    const module = await Module.findById(moduleId)
    if (!module) {
      return next(new AppError('Module not found', 404))
    }

    //3 find the course to verify instructor
    const course = await Course.findById(module.course)
    if (!course) {
      return next(new AppError('Associated course not found', 404))
    }

    //4 check if the user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(
        new AppError('You are not authorized to update this module', 403),
      )
    }

    //5 get the fields to update from the body
    const { title, description, optional } = req.body
    const updates = {}
    if (title) updates.title = title
    if (description) updates.description = description
    if (optional !== undefined) updates.optional = optional

    //6 update the module
    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { $set: updates },
      { new: true, runValidators: true },
    )

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
export async function createNewModule(req, res, next) {
  // get the modules course id
  const { courseId } = req.params
  if (!courseId) return next(new AppError('course id is required', 400))
  // get the module fields
  const { title, description } = req.body
  if (!title || !description)
    return next(new AppError('title and description are required', 400))
  try {
    // Finding the course to get the current number of modules
    const course = await Course.findById(courseId).populate('modules')
    if (!course) {
      return next(new AppError('Course not found', 404))
    }

    // Determine the order for the new module
    const newOrder = course.modules.length + 1

    // save the module
    const module = await Module.create({
      title,
      description,
      course: courseId,
      order: newOrder,
    })
    // Adding the new module to the course's modules array
    await Course.findByIdAndUpdate(courseId, { $push: { modules: module._id } })

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
export async function deleteModule(req, res, next) {
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

    //3 get the course and then the instructor
    const course = await Course.findOne({ modules: moduleId }).populate(
      'instructor',
    )
    if (!course) {
      return next(new AppError('course not found', 404))
    }

    //4 checking the if the user has the permition to delete
    if (!user.id.toString() === course.instructor.id.toString()) {
      return next(
        new AppError('you are not authorized to delete this module', 403),
      )
    }

    const module = await Module.find({ _id: moduleId })

    //5 delete the module
    await Module.findByIdAndDelete(moduleId)

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
