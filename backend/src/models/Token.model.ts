import mongoose from "mongoose";

import { ulid } from 'ulid';

import { ISession } from './Session.model';
import { IGroup } from "./Group.model";
import { IProfessorGroup } from "./ProfessorGroup.model";

interface IToken extends mongoose.Document {
    value: string;
    session: string | ISession;
    group: string  | IGroup;
    sentEvaluations: Array<string | IProfessorGroup>;
    unsentEvaluations: Array<string | IProfessorGroup>;
    finalYear: boolean;
}

const tokenSchema = new mongoose.Schema({
    value: {
        type: mongoose.SchemaTypes.String,
        default: () => {
            return ulid();
        }
    },
    session: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Session'
    },
    group: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Group'
    },
    sentEvaluations: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "ProfessorGroup",
            default: []
        }
    ],
    unsentEvaluations: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "ProfessorGroup",
            default: []
        }
    ],
    finalYear: {
        type: mongoose.SchemaTypes.Boolean
    }
});

const Token = mongoose.model<IToken>("Token", tokenSchema);

export {Token, IToken};