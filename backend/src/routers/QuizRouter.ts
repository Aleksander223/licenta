import express from "express";
import { parseXML } from "../services/parseXML";

const router = express.Router();

router.post("/quiz", /* [] */ async (req, res) => {
    try {
        const xml = await parseXML(req.body.xml);


        console.log(xml);

        res.status(201).send(xml);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;