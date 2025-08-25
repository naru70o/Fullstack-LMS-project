import mongoose, { Schema } from 'mongoose'
import { deleteVideo } from '../utils/cloudinary.js'
import AppError from '../utils/error.ts'

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a lecture title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a lecture description'],
      trim: true,
    },
    url: {
      videoUrl: {
        type: String,
        required: [true, 'Please provide a lecture url'],
        trim: true,
      },
      secureUrl: {
        type: String,
        required: [true, 'Please provide a lecture url'],
        trim: true,
      },
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    publicId: {
      type: String,
      required: [true, 'Please provide a public id'],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'not-started',
      enum: ['current', 'completed', 'not-started'],
    },
    order: {
      type: Number,
      required: [true, 'Please provide a lecture order'],
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Questions',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

lectureSchema.pre('save', async function (next) {
  if (this.duration) {
    this.duration = Math.round(this.duration * 100) / 100
  }

  next()
})

lectureSchema.methods.deletelactureVedio = async function () {
  try {
    // Collect all publicIds for video deletion
    const publicId = this.publicId
    if (!publicId) {
      return { status: 'failed', message: 'no public id found' }
    }

    // delete the lacture vedeo
    await deleteVideo(publicId)
    return { status: 'success', message: 'lecture vedio deleted successfully' }
  } catch (error) {
    throw new AppError(`Failed to delete lacture vedio: ${error.message}`, 500)
  }
}

const Lecture = mongoose.model('Lecture', lectureSchema)

export default Lecture
