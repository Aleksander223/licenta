import mongoose from "mongoose";

import { ulid } from 'ulid';

import { ISession } from './Session.model';
import { IGroup } from "./Group.model";

interface IToken extends mongoose.Document {
    value: string;
    session: string | ISession;
    group: string  | IGroup;
    used: boolean;
    sentEvaluations: Array<string>;
    unsentEvalations: Array<string>;
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
    used: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    sentEvaluations: [
        {
            type: mongoose.SchemaTypes.String
        }
    ],
    unsentEvaluations: [
        {
            type: mongoose.SchemaTypes.String
        }
    ]

    // store sent evaluations, unsent evaluations
});

const Token = mongoose.model<IToken>("Token", tokenSchema);

export {Token, IToken};