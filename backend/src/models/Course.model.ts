import mongoose from "mongoose";

interface ICourse extends mongoose.Document {
    year: number,
    semester: number,
    course: boolean,
    laboratory: boolean,
    practice: boolean,
    seminar: boolean,
    specialization: string,
    name: string,
    code: string
};

const courseSchema = new mongoose.Schema({
    year: {
        type: mongoose.SchemaTypes.Number
    },
    semester: {
        type: mongoose.SchemaTypes.Number
    },
    course: {
        type: mongoose.SchemaTypes.Boolean
    },
    laboratory: {
        type: mongoose.SchemaTypes.Boolean
    },
    practice: {
        type: mongoose.SchemaTypes.Boolean
    },
    seminar: {
        type: mongoose.SchemaTypes.Boolean
    },
    specialization: {
        type: mongoose.SchemaTypes.String
    },
    name: {
        type: mongoose.SchemaTypes.String
    },
    code: {
        type: mongoose.SchemaTypes.String
    }
});

const Course = mongoose.model<ICourse>("Course", courseSchema);

export {Course, ICourse};