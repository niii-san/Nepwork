import mongoose from "mongoose";
import { Job } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

export const getAllJobs = asyncHandler(async (_, res) => {
    const jobs = await Job.find()
        .populate({
            path: "postedBy",
            select: "name avatar ",
        })
        .populate("acceptedFreelancer");

    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "Fetched all jobs", jobs));
});

export const getJobsPostedByCurrentUser = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ postedBy: req.user._id }).populate(
        "acceptedFreelancer",
        "name avatar",
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                `Fetched all jobs posted By ${req.user.name.firstName}`,
                jobs,
            ),
        );
});

export const getSingleJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;

    if (!mongoose.isValidObjectId(jobId))
        throw new ApiError(400, false, "Invalid job id");

    const job = await Job.findById(jobId)
        .populate({
            path: "postedBy",
            select: "name avatar _id",
        })
        .populate("applications", "appliedBy")
        .populate("acceptedFreelancer", "name _id avatar");

    if (!job) throw new ApiError(404, false, "Job not found");

    return res
        .status(200)
        .json(new ApiResponse(200, true, false, "Job fetched", job));
});

export const getOpenJobs = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId))
        throw new ApiError(400, false, "Invalid userId");

    const jobs = await Job.find({ postedBy: userId, status: "open" });

    return res
        .status(200)
        .json(new ApiResponse(200, true, false, "Jobs fetched", jobs));
});
