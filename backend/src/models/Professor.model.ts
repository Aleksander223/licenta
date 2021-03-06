import mongoose from "mongoose";
import { IUser } from "./User.model";

interface IProfessor extends mongoose.Document {
    name: string;
    userProfile?: string | IUser;
    code: string;
}

const professorSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
    },
    userProfile: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    code: {
        type: mongoose.SchemaTypes.String
    }
});

const Professor = mongoose.model<IProfessor>("Professor", professorSchema);

export {Professor, IProfessor};