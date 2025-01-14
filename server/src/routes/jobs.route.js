import { Router } from "express";
import { authenticate, verified } from "../middlewares/index.js";
import { createJob } from "../controllers/index.js";

export const jobRouter = Router();

jobRouter.post("/create-job", authenticate, verified, createJob);
