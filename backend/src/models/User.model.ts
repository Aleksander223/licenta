import mongoose from "mongoose";

import validator from "validator";

import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        validate: (v: string) => validator.isEmail(v)
    },
    password: {
        type: mongoose.SchemaTypes.String,
        validate: (v: string) => validator.isStrongPassword(v)
    }
});

// hash password before saving it
// @ts-ignore
userSchema.pre<IUser>('save', function (next: any, err: any) {
    // @ts-ignore
    if (this.isNew) {
        // @ts-ignore
        this.password = bcrypt.hashSync(this.password);
    }

    next();
});

const User = mongoose.model<IUser>("User", userSchema);

export {User, IUser};