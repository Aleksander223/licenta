import mongoose from "mongoose";

import validator from "validator";

import bcrypt from "bcryptjs";

enum Role {
    ADMIN,
    PROFESSOR
}

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    role: Role;
    code?: string;
}

interface UserJWT {
    email: string;
    role: Role;
}

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        validate: (v: string) => validator.isEmail(v)
    },
    password: {
        type: mongoose.SchemaTypes.String,
        validate: (v: string) => validator.isStrongPassword(v)
    },
    role: {
        type: mongoose.SchemaTypes.Number,
    },
    code: {
        type: mongoose.SchemaTypes.String
    }
});

// hash password before saving it
// @ts-ignore
userSchema.pre<IUser>('save', function (next: any, err: any) {
    
    if (this.isNew) {
        
        if (!validator.isStrongPassword(this.password)) {
            throw new Error('Password not strong enough');
        }

        
        this.password = bcrypt.hashSync(this.password);
    } 

    next();
});

const User = mongoose.model<IUser>("User", userSchema);

export {User, IUser, UserJWT};