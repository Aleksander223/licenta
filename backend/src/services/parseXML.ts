import { parseStringPromise } from "xml2js";
import util from "util";

import {QuestionType} from "../models/Quiz.model";

function translateFromRomanian(name: string) {
    switch (name) {
        case "chestionar":
            return "quiz";
        case "sectiune":
            return "sections";
        case "enunt":
            return "definition";
        case "label":
            return "label";
        case "rasp":
            return "choices";
        case "intrebare":
            return "questions";
        default:
            return name
    }
}

export async function parseXML(xml: string) {
    const result = await parseStringPromise(xml, {
        tagNameProcessors: [translateFromRomanian],
        trim: true,
        normalize: true 
    });

    for (let section in result.quiz.sections) {
        const currentSection = result.quiz.sections[section];

        if (currentSection.hasOwnProperty("label")) {
            currentSection.label = currentSection.label[0];
        }

        for (let question in currentSection.questions) {
            const currentQuestion = currentSection.questions[question];
            currentQuestion.definition = currentQuestion.definition[0];

            if (currentQuestion.hasOwnProperty("choices")) {
                currentQuestion.answerType = QuestionType.RADIO;
            } else {
                currentQuestion.answerType = QuestionType.TEXT;
            }
        }
    }

    // console.log(util.inspect(result, false, null, true));

    return result;
}