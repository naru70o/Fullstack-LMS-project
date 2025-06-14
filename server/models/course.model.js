import mongoose from 'mongoose';

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

// TODO, the sum of the total lectures


const Course = mongoose.model('Course', courseSchema);

export default Course;
