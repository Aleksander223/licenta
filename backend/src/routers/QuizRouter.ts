import express from "express";
import { parseXML } from "../services/parseXML";

import { Quiz } from "../models/Quiz.model";

import path from "path";
import multer from "multer";
import { verifyAdmin, verifyUser } from "../middlewares/auth";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2097152, // 2 megabytes
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.xml') {
            return cb(new Error("Invalid filetype"));
        }

        cb(null, true);
    }
});

const router = express.Router();

router.post("/quiz", [verifyUser, verifyAdmin, upload.single('file')], async (req, res) => {
    try {
        const parsedXML = await parseXML(req.file.buffer.toString());

        const quiz = new Quiz(parsedXML);

        await quiz.save();
    
        res.status(201).send(quiz);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;