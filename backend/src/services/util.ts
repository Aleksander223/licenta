import { Group } from "../models/Group.model";
import { CourseType, IProfessorGroup, ProfessorGroup } from "../models/ProfessorGroup.model";

export async function constructProfessorGroupArray(arr: Array<string>, result: Array<IProfessorGroup>, professor: string, course: string, type: CourseType) {
    for await (const it of arr) {
        const group = (await Group.findOne({
            name: it
        }))._id as string;

        result.push(new ProfessorGroup({
            professor,
            course,
            group,
            type
        }));
    }
}

export function transformTypeToName(type) {
    switch (type) {
        case 0:
            return "Curs";
        case 1:
            return "Seminar";
        case 2:
            return "Laborator";
        case 3:
            return "Practica";
        default:
            return "Undefined";
    }
}