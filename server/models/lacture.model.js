import mongoose from "mongoose";
import { deleteMultipleVideos, deleteVideo } from "../utils/cloudinary.js";
import AppError from "../utils/error.js";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a lecture title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a lecture description"],
      trim: true,
    },
    url: {
      videoUrl: {
        type: String,
        required: [true, "Please provide a lecture url"],
        trim: true,
      },
      secureUrl: {
        type: String,
        required: [true, "Please provide a lecture url"],
        trim: true
      }
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    publicId: {
      type: String,
      required: [true, "Please provide a public id"],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: [true, "Please provide a lecture order"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

lectureSchema.pre("save", async function (next) {
  if (this.duration) {
    this.duration = Math.round(this.duration * 100) / 100
  }

  next()
})

lectureSchema.statics.deleteLecturesByModuleId = async function (moduleId) {
  try {
    // Find all lectures for the given moduleId
    const lectures = await this.find({ moduleId: moduleId });

    if (!lectures || lectures.length === 0) {
      return { deletedDbCount: 0, deletedVideoCount: 0 };
    }

    // Collect all publicIds for video deletion
    const publicIds = lectures
      .map(lecture => lecture.publicId)
      .filter(id => id);

    if (publicIds.length > 0) {
      await deleteMultipleVideos(publicIds);
    }

    // Delete the lecture documents from the database
    const deleteResult = await this.deleteMany({ moduleId: moduleId });

    return { deletedDbCount: deleteResult.deletedCount, deletedVideoCount: publicIds.length };
  } catch (error) {
    console.error(`Error deleting lectures for moduleId ${moduleId}: ${error.message}`);
    throw new AppError(`Failed to delete lectures for module ${moduleId}. ${error.message}`, 500);
  }
}

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;