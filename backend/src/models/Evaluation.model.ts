import mongoose from "mongoose";

interface IEvaluation extends mongoose.Document {
    course: string;
    activityEvaluationId: string;
}

const evaluationSchema = new mongoose.Schema({
    course: {
        type: mongoose.SchemaTypes.String
    },
    activityEvaluation: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ActivityEvaluation'
    }
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};