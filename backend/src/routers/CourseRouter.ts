import express from "express";

const router = express.Router();

import path from "path";
import multer from "multer";
import { parseCourseCSV } from "../services/parseCSV";
import { Course } from "../models/Course.model";

import {verifyUser, verifyAdmin} from "../middlewares/auth";

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

router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).send({
            courses
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.post("/courses", [verifyUser, verifyAdmin, upload.single("file")], async (req, res) => {
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

router.put("/course/:id", async(req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body);

        if (!course) {
            return res.status(404).send({
                error: "Course not found"
            });
        }
        await course.save();
        return res.status(200).send(course);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    } 
});

router.delete("/course/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;