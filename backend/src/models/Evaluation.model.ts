import mongoose from "mongoose";

import { ICourse } from "./Course.model";
import { IProfessor } from "./Professor.model";

interface IEvaluation extends mongoose.Document {
    course: string | ICourse;
    professor: string | IProfessor;
    series: number;
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
    series: {
        type: mongoose.SchemaTypes.Number
    }
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};