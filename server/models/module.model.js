import mongoose from 'mongoose';
import Lecture from './lacture.model.js';
import { deleteMultipleVideos } from '../utils/cloudinary.js';

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
moduleSchema.pre('findOneAndDelete', async function (next) {
    try {
        //1. getting the deleted module Id
        const module = await this.model.findById(this.getQuery());
        if (!module) {
            return next();
        }
        //2. getting the all lactures assosiated with the module
        const lactures = await Lecture.find({ _id: { $in: module.lectures } })
        if (lactures.length > 0) {
            //3. collect all public Ids for vedio deletion
            const puplicId = lactures.map(l => l.publicId)
            console.log("here is the lactures public Ids", puplicId)

            //4. delete all the vedios in cloudinary
            await deleteMultipleVideos(lactures)
        }

        //5. delete lactures from the database
        await Lecture.deleteMany({ _id: { $in: module.lectures } })
        console.log("this operation was done")

        next();
    } catch (error) {
        next(error);
    }
})

const Module = mongoose.model('Module', moduleSchema);
export default Module;