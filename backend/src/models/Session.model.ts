import mongoose from "mongoose";

import { IQuiz } from "./Quiz.model";

interface ISession extends mongoose.Document {
    startDate: Date;
    endDate: Date;
    finalYear: boolean;
    semester: number;
    courseQuiz: string | IQuiz;
    laboratoryQuiz: string | IQuiz;
    seminarQuiz: string | IQuiz;
    practiceQuiz: string | IQuiz;
    name: string;
    active: boolean;
};

const sessionSchema = new mongoose.Schema({
    startDate: {
        type: mongoose.SchemaTypes.Date
    },
    endDate: {
        type: mongoose.SchemaTypes.Date
    },
    finalYear: {
        type: mongoose.SchemaTypes.Boolean
    },
    semester: {
        type: mongoose.SchemaTypes.Number
    },
    courseQuiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    },
    laboratoryQuiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    },
    seminarQuiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    },
    practiceQuiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    },
    name: {
        type: mongoose.SchemaTypes.String
    }
});

sessionSchema.virtual('active').get(function() {
    const currentDate = new Date();


    return this.startDate < currentDate && currentDate < this.endDate;
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export {Session, ISession};