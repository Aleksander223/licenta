import express from "express";

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

export default router;