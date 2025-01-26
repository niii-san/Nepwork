import { Router } from "express";
import { authenticate, verified, clientOnly } from "../middlewares/index.js";
import {
    createJob,
    getAllJobs,
    getHomePageJobs,
    getJobsPostedByCurrentUser,
    getSingleJob,
    updateJob,
} from "../controllers/index.js";

export const jobRouter = Router();

jobRouter.post("/create-job", authenticate, verified, clientOnly, createJob);
jobRouter.get("/", getAllJobs);
jobRouter.post("/update-job", authenticate, verified, clientOnly, updateJob);
jobRouter.get(
    "/get-jobs-posted-by-current-user",
    authenticate,
    clientOnly,
    getJobsPostedByCurrentUser,
);
jobRouter.get("/get-home-jobs", getHomePageJobs);
jobRouter.get("/:id", getSingleJob);

