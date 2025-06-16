import mongoose from 'mongoose';
import Lecture from './lacture.model.js';

const moduleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Module title is required'],
            trim: true,
        },
        optional: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            trim: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        lectures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture',
        }],
        order: Number, // To maintain the order of modules within a course
    },
    { timestamps: true }
);

// Delete all the related lectures when a module deleted
moduleSchema.pre('findByIdAndDelete', async function (next) {
    try {
        await Promise.all(this.lectures.map(lectureId => Lecture.findByIdAndDelete(lectureId)));
        next();
    } catch (error) {
        next(error);
    }
})

const Module = mongoose.model('Module', moduleSchema);
export default Module;