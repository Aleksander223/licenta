import express from "express";

import { User } from "../models/User.model";
import { login } from "../services/login";
import { verifyUser } from "../middlewares/auth";

const router = express.Router();



router.post("/user", async (req, res) => {
    try {
        if (!req.body.root_password) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        if (req.body.root_password != process.env.ROOT_PASSWORD) {
            return res.status(403).send({error: 'Unauthorized'});
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        await user.save();

        return res.status(201).send({user});
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        return res.status(200).send({token});
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/status", verifyUser, async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

export default router;