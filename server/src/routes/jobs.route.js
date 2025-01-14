import { Router } from "express";
import { authenticate, verified, clientOnly } from "../middlewares/index.js";
import {
    createJob,
    getAllJobs,
    getJobsPostedByCurrentUser,
    updateJob,
} from "../controllers/index.js";

export const jobRouter = Router();

jobRouter.post("/create-job", authenticate, verified, clientOnly, createJob);
jobRouter.get("/get-all-jobs", getAllJobs);
jobRouter.post("/update-job", authenticate, verified, clientOnly, updateJob);
jobRouter.get(
    "/get-jobs-posted-by-current-user",
    authenticate,
    clientOnly,
    getJobsPostedByCurrentUser,
);
