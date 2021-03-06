import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth";

import { Session } from "../models/Session.model";
import { Token } from "../models/Token.model";

const router = express.Router();

router.post("/session", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const session = new Session(req.body);

        await session.save();

        return res.status(201).send(session);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.get("/session/exists", async (req, res) => {
    try {
        const session = await Session.findOne({
        }, null, {
            sort: {
                $natural: -1
            }
        });

        console.log(session);

        if (!session || !session.active) {
            return res.status(404).send({
                error: "No session active"
            });
        }

        return res.status(200).send(session);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.get("/session/current", async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
            sort: {
                $natural: -1
            }
        }).populate([
            {
                path: 'courseQuiz'
            },
            {
                path: 'seminarQuiz'
            },
            {
                path: 'laboratoryQuiz'
            },
            {
                path: 'practiceQuiz'
            },
        ]);

        if (!session || !session.active) {
            return res.status(404).send({
                error: "No session active"
            });
        }

        return res.status(200).send(session);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.post("/session/stop", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
            sort: {
                $natural: -1
            }
        });

        if (!session || !session.active) {
            return res.status(404).send({
                error: "No session active"
            });
        }

        session.endDate = new Date();

        await Token.deleteMany();

        await session.save();

        return res.status(200).send(session);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.put("/session/:id", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).send(session);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.get("/sessions", async (req, res) => {
    try {
        const sessions = await Session.find();

        const populatedSessions = sessions.map(x => {return {
            ...x.toJSON(),
            active: x.active
        }});

        return res.status(200).send({
            sessions: populatedSessions
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});     

export default router;