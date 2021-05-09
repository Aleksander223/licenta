import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';

import { IUser, User } from '../models/User.model';
import { IToken, Token } from '../models/Token.model';

export async function verifyStudent(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authorization = req.get('Authorization');

    if (!authorization) {
        return res.status(403).send({
            error: "Not logged in"
        });
    }

    let token;

    try {
        token = jwt.verify(authorization as string, process.env.SECRET!) as IToken;
    } catch (error) {
        return res.status(403).send({
            error: 'Login expired',
        });
    }

    const user = await Token.findOne({
        value: token.token
    });

    if (!user) {
        return res.status(403).send({
            error: 'Login expired',
        });
    }

    req.studentToken = user;
    req.token = token;
    next();
}

export async function verifyUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authorization = req.get('Authorization');

    if (!authorization) {
        return res.status(403).send({
            error: "Not logged in"
        });
    }

    let token;

    try {
        token = jwt.verify(authorization as string, process.env.SECRET!) as IUser;
    } catch (error) {
        return res.status(403).send({
            error: 'Login expired',
        });
    }

    const user = await User.findById(token._id);

    if (!user) {
        return res.status(403).send({
            error: 'Login expired',
        });
    }

    req.user = user;
    req.token = authorization;
    next();
}

export async function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.user!.role == 0) {
        next();
    }

    return res.status(403).send({error: 'Unauthorized'});
}

export async function verifyProfessor(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.user!.role == 1) {
        next();
    }

    return res.status(403).send({error: 'Unauthorized'});
}