import express from "express";

const router = express.Router();

import path from "path";
import multer from "multer";
import { parseCourseCSV } from "../services/parseCSV";
import { Course } from "../models/Course.model";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2097152, // 2 megabytes
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.csv') {
            return cb(new Error("Invalid filetype"));
        }

        cb(null, true);
    }
});

router.post("/courses", upload.single("file"), async (req, res) => {
    try {
        const courses = await parseCourseCSV(req.file.buffer.toString());

        await Course.deleteMany({});

        for await (const course of courses) {
            await new Course(course).save();
        }

        return res.status(201).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;