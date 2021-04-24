import mongoose from "mongoose";

enum QuizletType{
    RADIO,
    TEXT
}

interface IQuizlet {
    question: string;
    choices?: Array<string>;
    answerType: QuizletType;
}

interface ISection {
    label: string;
    quizlets: Array<IQuizlet>;
}

interface IQuiz extends mongoose.Document {
    quiz: Array<ISection>;
}

const quizSchema = new mongoose.Schema({
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
                    answerType: mongoose.SchemaTypes.Number
                }
            ],
        }
    ]
});

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export { Quiz, IQuiz }