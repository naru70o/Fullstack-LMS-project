import Lecture from '../../models/lacture.model.js'
import AppError from '../../utils/error.ts'
import { uploadImage } from '../../utils/cloudinary.ts'
import Questions from '../../models/course.questionandanswer.js'

// Post a new question or reply to a lecture
export async function askQuestion(req, res, next) {
  // 1. Get data from request
  const { lectureId } = req.params
  const { title, description, parentId } = req.body
  const authorId = req.user._id

  // 2. Basic validation
  if (!lectureId || !title) {
    return next(
      new AppError('Lecture ID and question title are required.', 400),
    )
  }

  try {
    // 3. Check if the lecture exists
    const lecture = await Lecture.findById(lectureId)
    if (!lecture) {
      return next(new AppError('Lecture not found.', 404))
    }

    // 4. Handle optional image upload
    let imagePayload = {}
    if (req.file) {
      const uploadResult = await uploadImage(req.file.buffer)
      if (
        !uploadResult ||
        !uploadResult.public_id ||
        !uploadResult.secure_url
      ) {
        return next(new AppError('Failed to upload image.', 500))
      }
      imagePayload = {
        publicId: uploadResult.public_id,
        secureUrl: uploadResult.secure_url,
      }
    }

    // 5. Create the new question instance. Mongoose creates the _id on instantiation.
    const newQuestion = new Questions({
      lectureId,
      parentId: parentId || null,
      question: {
        title,
        description,
        image: imagePayload.publicId ? imagePayload : undefined,
      },
      author: authorId,
    })

    // 6. Handle path generation
    if (parentId) {
      // This is a reply
      const parentQuestion = await Questions.findById(parentId)
      if (!parentQuestion) {
        return next(
          new AppError('Parent question not found. Cannot post reply.', 404),
        )
      }
      // Construct path from parent
      newQuestion.path = `${parentQuestion.path}/${newQuestion._id}`
    } else {
      // This is a new top-level question
      newQuestion.path = newQuestion._id.toString()
    }

    // 7. Save the fully constructed question
    await newQuestion.save()

    // 8. Add the question reference to the lecture
    await Lecture.findByIdAndUpdate(lectureId, {
      $push: { questions: newQuestion._id },
    })

    // 9. Send response
    res.status(201).json({
      status: 'success',
      data: {
        question: newQuestion,
      },
      message: 'Question posted successfully.',
    })
  } catch (error) {
    return next(
      new AppError(
        `Internal server error while posting question: ${error.message}`,
        500,
      ),
    )
  }
}
