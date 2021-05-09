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

router.get("/groups", async (req, res) => {
    try {
        const groups = await Group.find();

        return res.status(200).send({
            groups
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.post("/groups", upload.single("file"), async (req, res) => {
    try {
        const groups = await parseGroupCSV(req.file.buffer.toString());

        await Group.deleteMany({});

        for await (const group of groups) {
            // const matchedCourses = await Course.find({
            //     code: {
            //         $in: group.courses
            //     }
            // });

            // group.courses = matchedCourses.map(x => x._id);
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

router.put("/group/:id", async(req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body);

        if (!group) {
            return res.status(404).send({
                error: "Group not found"
            });
        }
        await group.save();
        return res.status(200).send(group);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    } 
});

router.delete("/group/:id", async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;