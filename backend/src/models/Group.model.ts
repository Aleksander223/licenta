import mongoose from "mongoose";
import { ICourse } from "./Course.model";
import { IProfessor } from "./Professor.model";

interface IGroup extends mongoose.Document {
    name: string;
    numberOfStudents: number;
    courses: Array<String>;
    series: string;
    year: number;
    studyFormation: string;
}

const groupSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String
    },
    numberOfStudents: {
        type: mongoose.SchemaTypes.Number
    },
    courses: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Course'
        }
    ],
    series: {
        type: mongoose.SchemaTypes.String
    },
    year: {
        type: mongoose.SchemaTypes.Number
    }
});

const Group = mongoose.model<IGroup>('Group', groupSchema);

export {Group, IGroup};