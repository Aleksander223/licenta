import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {User, UserJWT} from "../models/User.model";

import {Token} from "../models/Token.model";

export async function login(email: string, password: string): Promise<string | never> {
    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error("Incorrect email or password");
    }

    const token = jwt.sign({
        email: user.email,
        role: user.role,
        _id: user._id
    }, process.env.SECRET!, {
        expiresIn: '30d'
    });

    return token;
}

export async function tokenLogin(token: string): Promise<string | never> {
    const userToken = await Token.findOne({
        value: token
    });

    if (!userToken) {
        throw new Error("User not found");
    }

    const authToken = jwt.sign({
        token,
        // .. other data such as completed amount of quizzes
    }, process.env.SECRET!);

    return authToken;
}