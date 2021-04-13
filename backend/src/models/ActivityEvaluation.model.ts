import mongoose from "mongoose";

interface IActivityEvaluation extends mongoose.Document {
    professorId: string;
    courseId: string;
    series: string;

    // other data
}

const ActivityEvaluationSchema = new mongoose.Schema({
    professorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    series: {
        type: mongoose.SchemaTypes.String
    }
});

const ActivityEvaluation = mongoose.model<IActivityEvaluation>("ActivityEvaluation", ActivityEvaluationSchema);

export {ActivityEvaluation, IActivityEvaluation};