import { Router } from "express";
import {
    authenticate,
    verified,
    clientOnly,
    freelancerOnly,
} from "../middlewares/index.js";
import {
    acceptFreelancer,
    applyJob,
    createJob,
    deleteJob,
    getApplicants,
    // getAllJobs,
    getHomePageJobs,
    getJobsPostedByCurrentUser,
    getOpenJobs,
    getSingleJob,
    updateJob,
} from "../controllers/index.js";

export const jobRouter = Router();

jobRouter.post("/create-job", authenticate, verified, clientOnly, createJob);
// jobRouter.get("/", getAllJobs);
jobRouter.post("/update-job", authenticate, verified, clientOnly, updateJob);
jobRouter.get(
    "/get-jobs-posted-by-current-user",
    authenticate,
    clientOnly,
    getJobsPostedByCurrentUser,
);
jobRouter.delete("/delete-job/:jobId", authenticate, clientOnly, deleteJob);
jobRouter.get("/get-home-jobs", getHomePageJobs);

jobRouter.post("/apply", authenticate, verified, freelancerOnly, applyJob);
jobRouter.get("/applicants/:jobId", getApplicants);

jobRouter.post(
    "/:jobId/accept-freelancer",
    authenticate,
    clientOnly,
    acceptFreelancer,
);
jobRouter.get("/:userId/open-jobs", getOpenJobs);

jobRouter.get("/:id", getSingleJob);
