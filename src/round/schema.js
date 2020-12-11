import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
        courseTime: {type: String, required: true},
        cpts: {type: Boolean, required: true},
        cpte: {type: Boolean, required: true},
        ee: {type: Boolean, required: true},
        se: {type: Boolean, required: true},
        courseId: {type: String, required: true},
        courseName: {type: String, required: true},
        description: {type: String, required: true},
        prerequisites: {type: String, required: true},
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

export {roundSchema};
