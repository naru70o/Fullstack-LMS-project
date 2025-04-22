import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Lecture Progress Schema
const lectureProgressSchema = new Schema({
    lecture: {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
      required: true,
      index: true,
    },
    watchTime: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastWatched: {
      type: Date,
      required: true,
      default: Date.now,
    },
  }, {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  });

// Define the Course Progress Schema
const courseProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a 'User' model
    required: true,
    index: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course', // Assumes you have a 'Course' model
    required: true,
    index: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  completionPercentage: {
    type: Number, // Represents percentage (0-100) or similar metric
    required: true,
    default: 0,
    min: 0,
    max: 100, // Assuming a percentage scale
  },
  lectureProgress: [{
    type: Schema.Types.ObjectId,
    ref: 'LectureProgress', // References documents from your LectureProgress model
  }],
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

// Optional: Ensure a user can only have one progress document per course
courseProgressSchema.index({ user: 1, course: 1 }, { unique: true });

courseProgressSchema.pre('save', async function (next) {
    if(this.lectureProgress.length > 0){
        const completedLectures = this.lectureProgress.filter(lecture => lecture.isCompleted).length()
        this.completionPercentage = Math.round((completedLectures / this.lectureProgress.length) * 100)
        this.isCompleted = this.completionPercentage === 100
    }

    next()
})

courseProgressSchema.methods.lastActive = function () {
    this.lastActive = Date.now()
    return this.save({validateBeforeSave:false})
}

export const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);
export const LectureProgress = mongoose.model('LectureProgress', lectureProgressSchema);

