import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth";

import { Group } from "../models/Group.model";
import { ProfessorGroup } from "../models/ProfessorGroup.model";
import { Token } from "../models/Token.model";
import { Session } from "../models/Session.model";

const router = express.Router();

router.post("/tokens/generate", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        await Token.deleteMany({});

        const finalYear = req.body.finalYear;

        const groups = await Group.find({
            finalYear
        });

        const tokens = [];

        for (let i = 0; i < groups.length; i++) {
            tokens.push({
                name: groups[i].name,
                tokens: []
            });

            const evaluations = (await ProfessorGroup.find({
                group: groups[i]._id
            })).map(x => x._id);

            for (let j = 0; j < groups[i].numberOfStudents; j++) {
                const token = new Token({
                    unsentEvaluations: evaluations,
                    group: groups[i]._id
                });

                await token.save();

                tokens[i].tokens.push(token.value);
            }
        }

        return res.status(201).send({
            tokens
        });
        
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

router.get("/tokens", [verifyUser, verifyAdmin], async (req, res) => {
    try {
        const tokens = await Token.find().populate({
            path: "group"
        });

        return res.status(200).send({
            tokens
        });
    } catch (error) {
        return res.status(500).send({
            error
        });
    }
});

export default router;