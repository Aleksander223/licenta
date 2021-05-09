import express from "express";

const router = express.Router();

import path from "path";
import multer from "multer";
import { parseProfessorCSV } from "../services/parseCSV";
import { Professor } from "../models/Professor.model";

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

router.get("/professors", async (req, res) => {
    try {
        const professors = await Professor.find();

        return res.status(200).send({
            professors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });  
    }
});

router.post("/professors", upload.single("file"), async (req, res) => {
    try {
        const professors = await parseProfessorCSV(req.file.buffer.toString());

        await Professor.deleteMany({});

        for await (const professor of professors) {
            await new Professor(professor).save();
        }

        return res.status(201).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

router.put("/professor/:id", async(req, res) => {
    try {
        const professor = await Professor.findByIdAndUpdate(req.params.id, req.body);

        if (!professor) {
            return res.status(404).send({
                error: "Professor not found"
            });
        }
        await professor.save();
        return res.status(200).send(professor);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    } 
});

router.delete("/professor/:id", async (req, res) => {
    try {
        await Professor.findByIdAndDelete(req.params.id);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
});

export default router;