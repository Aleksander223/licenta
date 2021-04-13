import express from "express";
import dotenv from "dotenv";

import ExampleRouter from "./routers/ExampleRouter";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(ExampleRouter);

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Backend running on port ${process.env.BACKEND_PORT}`);
});