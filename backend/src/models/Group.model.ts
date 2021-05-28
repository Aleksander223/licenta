import mongoose from "mongoose";
import { ICourse } from "./Course.model";
import { IProfessor } from "./Professor.model";

interface IGroup extends mongoose.Document {
    name: string;
    numberOfStudents: number;
    series: string;
    year: number;
    studyFormation: string;
    finalYear: boolean;
}

const groupSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String
    },
    numberOfStudents: {
        type: mongoose.SchemaTypes.Number
    },
    series: {
        type: mongoose.SchemaTypes.String
    },
    year: {
        type: mongoose.SchemaTypes.Number
    },
    finalYear: {
        type: mongoose.SchemaTypes.Boolean
    }
});

const Group = mongoose.model<IGroup>('Group', groupSchema);

export {Group, IGroup};