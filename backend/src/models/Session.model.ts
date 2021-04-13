import mongoose from "mongoose";

interface ISession extends mongoose.Document {
    startDate: Date,
    endDate: Date,
    finalYear: boolean,
    semester: number,
};

const sessionSchema = new mongoose.Schema({
    startDate: {
        type: mongoose.SchemaTypes.Date
    },
    endDate: {
        type: mongoose.SchemaTypes.Date
    },
    finalYear: {
        type: mongoose.SchemaTypes.Boolean
    },
    semester: {
        type: mongoose.SchemaTypes.Number
    }
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export {Session, ISession};