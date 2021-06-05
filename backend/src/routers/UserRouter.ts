import express from "express";

import { User } from "../models/User.model";
import { login } from "../services/login";
import { verifyAdmin, verifyProfessor, verifyUser } from "../middlewares/auth";
import { Evaluation } from "../models/Evaluation.model";
import { Session } from "../models/Session.model";
import { Professor } from "../models/Professor.model";

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
            role: req.body.role,
            code: req.body.code
        });

        await user.save();

        return res.status(201).send();
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

router.get("/evaluations/total", async (req, res) => {
    try {
        const session = await Session.findOne({}, null, {
            sort: {
                $natural: -1
            }
        });

        if (!session.active) {
            throw new Error("No session active");
        }

        const evaluations = await Evaluation.find({
            session: session._id
        });

        return res.status(200).send({
            noEvaluations: evaluations.length
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/evaluations/latest", async (req, res) => {
    try {
        const session = await Session.findOne({}, null, {
            sort: {
                $natural: -1
            }
        });

        if (!session.active) {
            throw new Error("No session active");
        }

        const evaluations = await Evaluation.find({
            createdAt: {
                $gt: new Date(Date.now() - 86400000)
            },
            session: session._id
        });
        

        return res.status(200).send({
            noEvaluations: evaluations.length
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/evaluations/bins", async (req, res) => {
    try {
        const session = await Session.findOne({}, null, {
            sort: {
                $natural: -1
            }
        });

        if (!session.active) {
            throw new Error("No session active");
        }

        // @ts-ignore
        const dayOfYear = (date: Date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        const bins = [];

        for (let i = dayOfYear(session.startDate); i < dayOfYear(session.endDate); i++) {
            const now = new Date();

            const leftLimit = new Date(now.getFullYear(), 0, i - 1, 0, 0, 0);
            const rightLimit = new Date(now.getFullYear(), 0, i, 0, 0, 0);

            const evaluations = await Evaluation.find({
                createdAt: {
                    $gte: leftLimit,
                    $lt: rightLimit
                },
                session: session._id
            });

            bins.push(evaluations.length);
        }

        return res.status(200).send({
            bins
        });

    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/report", [verifyUser, verifyProfessor], async (req, res) => {
    try {
        console.log(req.user);

        const professor = await Professor.findOne({
            code: req.user.code
        });

        if (!professor) {
            throw new Error("No professor found");
        }

        const evaluations = await Evaluation.find({
            professor: professor._id
        }).populate([
            {
                path: 'professor'
            },
            {
                path: 'course'
            },
            {
                path: 'session'
            }
        ]);

        return res.status(200).send(evaluations);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;