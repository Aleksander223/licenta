import express from "express";

const router = express.Router();

import path from "path";
import multer from "multer";
import { parseProfessorGroupCSV } from "../services/parseCSV";
import { ProfessorGroup, CourseType } from "../models/ProfessorGroup.model";
import { Professor } from "../models/Professor.model";
import { Course } from "../models/Course.model";
import { constructProfessorGroupArray } from "../services/util";

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

router.post("/timetable", upload.single("file"), async (req, res) => {
    try {
        const professorGroups = await parseProfessorGroupCSV(req.file.buffer.toString());

        await ProfessorGroup.deleteMany({});

        for await (const professorGroup of professorGroups) {
            const professor = await Professor.findOne({
                code: professorGroup.professor
            });

            const course = await Course.findOne({
                code: professorGroup.course
            });

            const result = [];

            await constructProfessorGroupArray(professorGroup.courses, result, professor._id as string, course._id as string, CourseType.COURSE);
            await constructProfessorGroupArray(professorGroup.seminars, result, professor._id as string, course._id as string, CourseType.SEMINAR);
            await constructProfessorGroupArray(professorGroup.laboratories, result, professor._id as string, course._id as string, CourseType.LABORATORY);
            await constructProfessorGroupArray(professorGroup.practices, result, professor._id as string, course._id as string, CourseType.PRACTICE);

            await Promise.all(result.map(x => x.save()));
        }

        return res.status(201).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.get("/timetable", async (req, res) => {
    try {
        const professorGroups = await ProfessorGroup.find().populate([
            {
                path: 'professor'
            },
            {
                path: 'course'
            },
            {
                path: 'group'
            }
        ]);

        return res.status(200).send({
            timetable: professorGroups
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;