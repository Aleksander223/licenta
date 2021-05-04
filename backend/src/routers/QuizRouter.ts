import express from "express";
import { parseXML } from "../services/parseXML";

import path from "path";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2097152, // 2 megabytes
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.xml') {
            cb(null, false);
        }

        cb(null, true);
    }
});

const router = express.Router();

router.post("/quiz", upload.single('file'), async (req, res) => {
    try {
        const xml = await parseXML(req.file.buffer.toString());


        // console.log(xml);

        res.status(201).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;