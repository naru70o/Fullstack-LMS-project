import mongoose from "mongoose";

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
    videoUrl: {
      type: String,
      required: [true, "Please provide a lecture video URL"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration:{
      type: Number,
      required: true,
      default: 0,
    },
    publicId: {
      type: String,
      required: [true,"Please provide a public id"],
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
  { timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true },
  }
);

lectureSchema.pre("save", async function (next) {
    if(this.duration){
        this.duration=Math.round(this.duration * 100) / 100  
    }

    next()
})

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;