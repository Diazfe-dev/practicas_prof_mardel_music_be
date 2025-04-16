import express from "express";
import morgan from "morgan";

import envVars from "./config/env-vars.js";
import appRouter from './modules/appRouter.js';

const { PORT } = envVars;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRouter)
app.set('port', PORT);

export default app;