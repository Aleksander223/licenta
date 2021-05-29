import mongoose from "mongoose";

import { ICourse } from "./Course.model";
import { IProfessor } from "./Professor.model";
import { CourseType } from "./ProfessorGroup.model";
import { IQuiz } from "./Quiz.model";

interface IAnswer {
    definition: string;
    i: number;
    choice: string;
};

interface IAnswerSection {
    questions: Array<IAnswer>;
}

interface IEvaluation extends mongoose.Document {
    course: string | ICourse;
    professor: string | IProfessor;
    type: CourseType;
    quiz: string | IQuiz;
    answers: Array<IAnswerSection>;
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
    },
    quiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    },
    answers: [
        {
            questions: [
                {
                    definition: mongoose.SchemaTypes.String,
                    i: mongoose.SchemaTypes.Number,
                    choice: mongoose.SchemaTypes.String
                }
            ]
        }
    ]
}, {
    timestamps: true
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};