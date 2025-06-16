import mongoose from "mongoose";
import { deleteVideo } from "../utils/cloudinary.js";

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

lectureSchema.pre('remove', async function (next) {
  try {
    if (this.publicId) {
      await deleteVideo(this.publicId);
    }
    next();
  } catch (error) {
    console.error(`Failed to delete video ${this.publicId} from Cloudinary for lecture ${this._id}:`, error);
    next(error);
  }
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;