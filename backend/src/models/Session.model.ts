import mongoose from "mongoose";

import { IQuiz } from "./Quiz.model";

interface ISession extends mongoose.Document {
    startDate: Date;
    endDate: Date;
    finalYear: boolean;
    semester: number;
    quiz: string | IQuiz
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
    quiz: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz'
    }
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export {Session, ISession};