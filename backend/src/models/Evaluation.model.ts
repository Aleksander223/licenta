import mongoose from "mongoose";

interface IEvaluation extends mongoose.Document {
    course: string;
    activityEvaluationId: string;
    series: number;
}

const evaluationSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    professorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    series: {
        type: mongoose.SchemaTypes.Number
    }
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};