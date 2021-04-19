import mongoose from "mongoose";

enum QuizletType{
    RADIO,
    TEXT
}

interface IQuizlet {
    question: string;
    choices?: Array<string>;
    answerType: QuizletType;
    answer?: string | number;
}

interface ISection {
    label: string;
    quizlets: Array<IQuizlet>;
}

interface IEvaluation extends mongoose.Document {
    course: string;
    activityEvaluationId: string;
    quiz: Array<ISection>;
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
    },
    quiz: [
        {
            label: mongoose.SchemaTypes.String,
            quizlets: [
                {
                    question: mongoose.SchemaTypes.String,
                    choices: [
                        {
                            type: mongoose.SchemaTypes.String
                        }
                    ],
                    answer: mongoose.SchemaTypes.Mixed,
                    answerType: mongoose.SchemaTypes.Number
                }
            ],
        }
    ]
});

const Evaluation = mongoose.model<IEvaluation>("Evaluation", evaluationSchema);

export {Evaluation, IEvaluation};