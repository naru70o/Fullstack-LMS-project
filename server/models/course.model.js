import mongoose from 'mongoose';
import Module from './module.model.js';
import AppError from '../utils/error.js';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [8, 'Title must be at least 8 characters'],
    maxLength: [50, 'Title must be less than 50 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [20, 'Description must be at least 20 characters'],
    maxLength: [200, 'Description must be less than 200 characters'],
    trim: true,
  },
  level: [{
    type: String,
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: 'Level must be either Beginner, Intermediate or Advanced',
    },
    required: [true, 'Level is required'],
    trim: true,
  }],
  category: [
    {
      type: String,
    }
  ],
  thumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  numberOfLectures: {
    type: Number,
    default: 0,
  },
  totalOfHours: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// TODO
courseSchema.virtual("overalRating", function () {
  // 
})


// Delete all the related modules when a course deleted
courseSchema.pre('remove', async function (next) {
  try {
    await Promise.all(this.modules.map(module => Module.findByIdAndDelete(module._id)));
    next();
  } catch (error) {
    return next(
      new AppError("internal server error when deleting course in the course middleware", 500)
    );
  }
})

const Course = mongoose.model('Course', courseSchema);

export default Course;
