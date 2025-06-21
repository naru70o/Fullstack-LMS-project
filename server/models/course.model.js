import mongoose from 'mongoose';
import Module from './module.model.js';
import AppError from '../utils/error.js';
import Lecture from './lacture.model.js';
import { deleteImage, deleteMultipleVideos } from '../utils/cloudinary.js';

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
courseSchema.pre('findOneAndDelete', async function (next) {
  try {
    const course = await this.model.findOne(this.getQuery());
    if (!course || !course.modules || course.modules.length === 0) {
      return next();
    }

    // 1. Find all module documents associated with the course to get their lecture IDs
    const modulesWithLectures = await Module.find({ _id: { $in: course.modules } }).select('lectures').lean();

    if (modulesWithLectures.length > 0) {
      // 2. Collect all lecture IDs from these modules
      const allLectureIds = modulesWithLectures.flatMap(module => module.lectures.map(id => id.toString()));

      if (allLectureIds.length > 0) {
        // 3. Find all lecture documents to get their publicIds for video deletion
        const lecturesToDelete = await Lecture.find({ _id: { $in: allLectureIds } }).select('publicId').lean();

        if (lecturesToDelete.length > 0) {
          // 4. Collect all publicIds for video deletion, filtering out any undefined/null ids
          const publicIdsForVideoDeletion = lecturesToDelete
            .map(lecture => lecture.publicId)

          if (publicIdsForVideoDeletion.length > 0) {
            // 5. Delete videos from Cloudinary
            await deleteMultipleVideos(publicIdsForVideoDeletion);
          }
        }
        // 6. Delete lecture documents from the database
        await Lecture.deleteMany({ _id: { $in: allLectureIds } });
      }
    }

    // 7. Delete all module documents associated with the course
    await Module.deleteMany({ _id: { $in: course.modules } });

    next();
  } catch (error) {
    console.error("Error in course pre 'findOneAndDelete' hook:", error);
    next(
      new AppError(`Error during course deletion cascade: ${error.message}`, 500)
    );
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
