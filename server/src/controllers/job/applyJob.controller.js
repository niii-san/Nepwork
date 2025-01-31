import mongoose from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { Job, JobApplication, User } from "../../models/index.js";

export const applyJob = asyncHandler(async (req, res) => {
    const jobId = (req.body.jobId ?? "").trim();
    const message = req.body.message ?? "";
    const userId = req.user.id;

    if (!jobId) throw new ApiError(400, true, "Job id is required");

    if (!mongoose.isValidObjectId(jobId))
        throw new ApiError(400, true, "Invalid job id");

    const job = await Job.findById(jobId);
    const user = await User.findById(userId);
    if (!job) throw new ApiError(404, true, "Job not found");

    if (job.postedBy.toString() === userId)
        throw new ApiError(400, true, "Cannot apply to self posted job");

    const alreadyApplied = await JobApplication.findOne({
        appliedBy: user._id,
        appliedTo: job._id,
    });

    if (alreadyApplied) {
        throw new ApiError(400, true, "You've already applied to this job");
    }

    const application = await JobApplication.create({
        appliedBy: user._id,
        appliedTo: job._id,
        message,
    });

    job.applications.push(application._id);
    user.jobsApplied.push(application._id);
    await job.save();
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "Job applied", application));
});
