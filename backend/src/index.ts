import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";

import ExampleRouter from "./routers/ExampleRouter";

import {Token} from "./models/Token.model";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(ExampleRouter);

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

    const token = new Token();
    console.log(token);

    await token.save();
});