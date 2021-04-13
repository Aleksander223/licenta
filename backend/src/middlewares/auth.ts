import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';

import { IUser, User } from '../models/User.model';

async function verifyUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.headers['Authorization']) {
        return res.status(403).send({
            error: "Not logged in"
        });
    }

    let token;

    try {
        token = jwt.verify(req.headers['Authorization'] as string, process.env.SECRET!) as IUser;
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
    req.token = req.headers['Authorization'];
    next();
}