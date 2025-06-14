import mongoose from 'mongoose';

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

const Module = mongoose.model('Module', moduleSchema);
export default Module;