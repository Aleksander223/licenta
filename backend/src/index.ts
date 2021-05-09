import express from "express";
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

import UserRouter from "./routers/UserRouter";
import StudentRouter from "./routers/StudentRouter";
import QuizRouter from "./routers/QuizRouter";
import CourseRouter from "./routers/CourseRouter";
import GroupRouter from "./routers/GroupRouter";
import ProfessorRouter from "./routers/ProfessorRouter";
import ProfessorGroupRouter from "./routers/ProfessorGroupRouter";
import TokenRouter from "./routers/TokenRouter";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(UserRouter);
app.use(StudentRouter);
app.use(QuizRouter);
app.use(CourseRouter);
app.use(GroupRouter);
app.use(ProfessorRouter);
app.use(ProfessorGroupRouter);
app.use(TokenRouter);

app.listen(process.env.BACKEND_PORT, async () => {
    if (!process.env.MONGO_DB_URL) {
        console.log('Please provide a MongoDB URL in the .env');
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_DB_URL, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    });

    console.log('Sucesfully connected to MongoDB');

    console.log(`Backend running on port ${process.env.BACKEND_PORT}`);
});