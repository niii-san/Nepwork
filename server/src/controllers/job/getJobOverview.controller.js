import mongoose from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { Job } from "../../models/index.js";

export const getJobOverview = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(jobId)) {
        throw new ApiError(400, false, "Invalid jobId");
    }

    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    if (!job) {
        throw new ApiError(404, false, "Job not found");
    }

    const overview = {
        workStartedAt: job.startTime,
        workEndedAt: job.endTime,
        finished: job.hasFinished,
        rate: job.hourlyRate,
        workedTimeInSec: job.workedTimeInSec,
        payment:job.payment,
        jobStatus: job.status,
    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                false,
                `Fetched job overview of ${jobId}`,
                overview,
            ),
        );
});
