import { Router } from "express";
import { authenticate, verified, clientOnly } from "../middlewares/index.js";
import { createJob } from "../controllers/index.js";

export const jobRouter = Router();

jobRouter.post("/create-job", authenticate, verified, clientOnly, createJob);
