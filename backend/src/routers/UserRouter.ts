import express from "express";

import { User } from "../models/User.model";
import { login } from "../services/login";
import { verifyAdmin, verifyProfessor, verifyUser } from "../middlewares/auth";
import { Evaluation } from "../models/Evaluation.model";
import { Session } from "../models/Session.model";
import { Professor } from "../models/Professor.model";
import { Token } from "../models/Token.model";
import { Course, ICourse } from "../models/Course.model";
import { transformTypeToName } from "../services/util";

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

router.get("/evaluations/total", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
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

router.get("/evaluations/latest", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
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

router.get("/evaluations/people", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
            sort: {
                $natural: -1
            }
        });

        if (!session.active) {
            throw new Error("No session active");
        }

        const evaluators = (await Token.find({
            session: session._id
        })).filter(x => x.unsentEvaluations.length == 0);

        return res.status(200).send({
            noPeople: evaluators.length
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.get("/evaluations/bins", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const finalYear = req.query.final == "yes" ? true : false;
        const session = await Session.findOne({
            finalYear
        }, null, {
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

router.get("/report/:id", [verifyUser, verifyProfessor], async (req, res) => {
    try {

        const professor = await Professor.findOne({
            code: req.user.code
        });

        if (!professor) {
            throw new Error("No professor found");
        }

        const evaluations = await Evaluation.find({
            professor: professor._id,
            session: req.params.id
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

        const courses = evaluations.map(x => (x.course as ICourse)._id).filter((x, i, self) => {
            return self.indexOf(x) === i;
        });

        const types = evaluations.map(x => x.type).filter((x, i, self) => {
            return self.indexOf(x) === i;
        });

        const aggregated = [];

        for (const course of courses) {
            for (const type of types) {
                const obj = {};
                const texts = [];
                const matched = evaluations.filter(x => (x.course as ICourse)._id == course && x.type == type);
                
                for (const match of matched) {
                    for (const section of match.answers.slice(0, -1)) {
                        for (const question of section.questions) {
                            if (!obj.hasOwnProperty(question.definition)) {
                                obj[question.definition] = {};
                            } 
                            if (!obj[question.definition].hasOwnProperty(question.choice)) {
                                obj[question.definition][question.choice] = 0;
                            }

                            obj[question.definition][question.choice]++;
                        }
                    }

                    const text = match.answers[match.answers.length - 1].questions[0].choice;

                    if (text != "" && text != null) {
                        texts.push(text);
                    }
                }

                aggregated.push({
                    course: (await Course.findById(course)).name,
                    type: transformTypeToName(type),
                    answers: obj,
                    texts
                });
            }
        }

        return res.status(200).send(aggregated);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;