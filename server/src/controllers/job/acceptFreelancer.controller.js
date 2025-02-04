import mongoose from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { Job, JobApplication } from "../../models/job.model.js";

export const acceptFreelancer = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const userId = req.user.id;

    const acceptedFreelancerId = (req.body.acceptedFreelancerId ?? "").trim();

    if (!acceptedFreelancerId)
        throw new ApiError(400, true, "Accepted Freelancer id is required");

    if (!mongoose.isValidObjectId(acceptedFreelancerId))
        throw new ApiError(400, true, "Invaid freelancer id");

    if (!mongoose.isValidObjectId(jobId))
        throw new ApiError(400, true, "Invalid job id");

    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    if (!job) throw new ApiError(404, true, "Job not found");

    if (job.acceptedFreelancer)
        throw new ApiError(400, true, "Job has already a freelancer");

    if (job.status !== "open") {
        throw new ApiError(
            400,
            true,
            "Job must be open to select a freelancer",
        );
    }

    const application = await JobApplication.findOne({
        appliedBy: acceptedFreelancerId,
        appliedTo: job._id,
    });

    if (!application)
        throw new ApiError(400, true, "Freelancer has not applied yet");

    job.acceptedFreelancer = acceptedFreelancerId;
    job.acceptedApplication = application;

    await job.save();

    return res.status(200).json(
        new ApiResponse(200, true, true, `Freelancer accepted for job`, {
            application,
        }),
    );
});
