import express from "express";
import { verifyStudent } from "../middlewares/auth";
import { Token } from "../models/Token.model";
import { Evaluation } from "../models/Evaluation.model";

import { tokenLogin } from "../services/login";
import { ProfessorGroup } from "../models/ProfessorGroup.model";

const router = express.Router();

router.post("/login/token", async (req, res) => {
    try {
        const token = await tokenLogin(req.body.token);

        return res.status(200).send({
            token
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/student/status", [verifyStudent], async (req, res) => {
    try {
        const status = await Token.findOne({
            value: req.token.token
        }).populate({
            path: 'unsentEvaluations',
            populate: [
                {
                    path: 'professor'
                },
                {
                    path:' course'
                }
            ]
        });

        return res.status(200).send(status);
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.post("/evaluation", [verifyStudent], async (req, res) => {
    try {
        const evaluation = new Evaluation(req.body);

        console.log(req.body);

        const pg = await ProfessorGroup.findOne({
            course: req.body.course,
            professor: req.body.professor
        });

        if (!pg) {
            throw new Error("Evaluation does not exist!");
        }

        await evaluation.save();

        req.studentToken.unsentEvaluations.splice(req.studentToken.unsentEvaluations.indexOf(pg._id), 1);
        req.studentToken.sentEvaluations.push(pg._id);
        await req.studentToken.save();

        return res.status(200).send(evaluation);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    } 
});

export default router;