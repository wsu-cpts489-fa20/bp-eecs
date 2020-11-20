import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
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
