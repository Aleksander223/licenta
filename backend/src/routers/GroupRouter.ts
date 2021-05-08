import express from "express";

const router = express.Router();

import path from "path";
import multer from "multer";
import { parseGroupCSV } from "../services/parseCSV";
import { Group } from "../models/Group.model";
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

router.post("/groups", upload.single("file"), async (req, res) => {
    try {
        const groups = await parseGroupCSV(req.file.buffer.toString());

        await Group.deleteMany({});

        for await (const group of groups) {
            const matchedCourses = await Course.find({
                code: {
                    $in: group.courses
                }
            });

            group.courses = matchedCourses.map(x => x._id);
            await new Group(group).save();
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