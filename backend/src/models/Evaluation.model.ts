import mongoose from "mongoose";

import { ICourse } from "./Course.model";
import { IProfessor } from "./Professor.model";
import { CourseType } from "./ProfessorGroup.model";

interface IEvaluation extends mongoose.Document {
    course: string | ICourse;
    professor: string | IProfessor;
    type: CourseType;
}

const evaluationSchema = new mongoose.Schema({
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    professor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Professor'
    },
    type: {
        type: mongoose.SchemaTypes.Number
    }
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};