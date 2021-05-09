import express from "express";
import { verifyStudent } from "../middlewares/auth";
import { Token } from "../models/Token.model";

import { tokenLogin } from "../services/login";

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



export default router;