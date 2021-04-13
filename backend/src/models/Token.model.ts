import mongoose from "mongoose";

import { ulid } from 'ulid';

interface IToken extends mongoose.Document {
    value: string;
    session: string;
    group: string;
    used: boolean;
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
    }
});

const Token = mongoose.model<IToken>("Token", tokenSchema);

export {Token, IToken};