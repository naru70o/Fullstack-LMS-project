import mongoose, { Schema } from 'mongoose'

const questionsSchema = mongoose.Schema({
  lectureId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture',
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Questions',
    default: null,
  },
  path: {
    type: String,
    required: true,
  },
  question: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      publicId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Questions = mongoose.model('Questions', questionsSchema)
export default Questions
