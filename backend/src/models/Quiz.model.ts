import mongoose from "mongoose";

enum QuestionType{
    RADIO,
    TEXT
}

interface IQuestion {
    definition: string;
    choices?: Array<string>;
    answerType: QuestionType;
}

interface ISection {
    label: string;
    questions: Array<IQuestion>;
}

interface IQuiz extends mongoose.Document {
    quiz: Array<ISection>;
}

const quizSchema = new mongoose.Schema({
    quiz: [
        {
            label: mongoose.SchemaTypes.String,
            questions: [
                {
                    definition: mongoose.SchemaTypes.String,
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

export { Quiz, IQuiz, QuestionType }