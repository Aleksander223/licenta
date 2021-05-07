import mongoose from "mongoose";
import { IUser } from "./User.model";

interface IProfessor extends mongoose.Document {
    name: string;
    userProfile?: string | IUser;
}

const professorSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
    },
    userProfile: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
});

const Professor = mongoose.model<IProfessor>("Professor", professorSchema);

export {Professor, IProfessor};