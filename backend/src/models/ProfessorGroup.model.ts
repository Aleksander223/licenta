import mongoose from "mongoose";
import { ICourse } from "./Course.model";
import { IGroup } from "./Group.model";
import { IProfessor } from "./Professor.model";

enum CourseType {
    COURSE,
    SEMINAR,
    LABORATORY,
    PRACTICE
}

interface IProfessorGroup extends mongoose.Document {
    course: string | ICourse;
    professor: string | IProfessor;
    group: string | IGroup;
    type: CourseType;
}

const professorGroupSchema = new mongoose.Schema({
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    },
    professor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Professor'
    },
    group: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Group'
    },
    type: {
        type: mongoose.SchemaTypes.Number
    }
});

const ProfessorGroup = mongoose.model<IProfessorGroup>("ProfessorGroup", professorGroupSchema);

export {ProfessorGroup, IProfessorGroup, CourseType};