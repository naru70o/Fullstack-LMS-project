import mongoose from 'mongoose';
import Lecture from './lacture.model.js';
import { deleteMultipleVideos } from '../utils/cloudinary.js';
import Course from './course.model.js';

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
            const publicId = lactures.map(l => l.publicId)
            console.log("here is the lactures public Ids", publicId)
            //4. delete all the vedios in cloudinary
            await deleteMultipleVideos(publicId)
        }
        //3.1 sum all the lacture duration
        const totalOfLactures = -lactures.length

        //3.2 total of lactures
        const totalLecturesDuration = lactures.reduce((sum, lecture) => sum + (lecture.duration || 0), 0);

        //3.3 remove the module form the course
        if (module.course) {
            await Course.findByIdAndUpdate(module.course, { $pull: { modules: module._id } })
        }

        //5. delete lactures from the database
        await Lecture.deleteMany({ _id: { $in: module.lectures } })

        // 6. Update the parent course's lecture count and total hours
        if (module.course) {
            await Course.findByIdAndUpdate(module.course, {
                $inc: {
                    numberOfLectures: totalOfLactures,
                    totalOfHours: -totalLecturesDuration
                }
            });
        }
        console.log("this operation was done")

        next();
    } catch (error) {
        next(error);
    }
})

const Module = mongoose.model('Module', moduleSchema);
export default Module;