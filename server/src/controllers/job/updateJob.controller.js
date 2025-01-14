import mongoose from "mongoose";
import { tags } from "../../constants.js";
import { Job } from "../../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const validateTags = (sentTags) => {
    for (let i = 0; i < sentTags.length; i++) {
        if (!tags.includes(sentTags[i])) {
            return false;
        }
    }
    return true;
};

export const updateJob = asyncHandler(async (req, res) => {
    const data = req.body;

    const userId = req.user._id;
    const jobId = (req.body.id ?? "").trim();
    const jobTitle = (data.title ?? "").trim();
    const jobDescription = (data.description ?? "").trim();
    const hourlyRate = Number(data.rate);
    const jobTags = data.tags ?? [];

    if (!jobId) throw new ApiError(400, true, "Job id is required");
    if (!mongoose.isValidObjectId(jobId))
        throw new ApiError(400, true, "Invalid job id");

    if (!jobTitle) throw new ApiError(400, true, "Job title is required");
    if (!jobDescription)
        throw new ApiError(400, true, "Job description is required");

    // validating tags
    if (!Array.isArray(jobTags))
        throw new ApiError(400, true, "Invalid tags format, send in array");
    if (jobTags.length == 0)
        throw new ApiError(400, true, "Atleast one tag is required");
    if (!validateTags(jobTags))
        throw new ApiError(400, true, "Tags contains invalid tags");

    if (!data.rate) throw new ApiError(400, true, "Hourly rate is required");
    if (isNaN(hourlyRate) || hourlyRate <= 0)
        throw new ApiError(
            400,
            true,
            "Invalid hourly rate, must be a positive number",
        );

    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId, postedBy: userId }, // Filter: Job must exist and belong to user
        {
            title: jobTitle,
            description: jobDescription,
            hourlyRate,
            tags: jobTags,
        },
        { new: true }, // Return the updated document
    );

    if (!updatedJob) throw new ApiError(400, true, "Job not found");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                `Job updated: ${updatedJob.title}`,
                updatedJob,
            ),
        );
});
