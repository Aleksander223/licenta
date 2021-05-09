import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/auth";

import { Group } from "../models/Group.model";
import { Token } from "../models/Token.model";

const router = express.Router();

router.post("/tokens/generate", [/*verifyUser, verifyAdmin*/], async (req, res) => {
    try {
        const groups = await Group.find();

        const tokens = [];

        for (let i = 0; i < groups.length; i++) {
            tokens.push({
                name: groups[i].name,
                tokens: []
            });

            for (let j = 0; j < groups[i].numberOfStudents; j++) {
                const token = new Token();

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

export default router;