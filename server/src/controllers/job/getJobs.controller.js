import { Job } from "../../models/index.js";
import { ApiResponse, asyncHandler } from "../../utils/index.js";

export const getAllJobs = asyncHandler(async (_, res) => {
    const jobs = await Job.find().populate({
        path: "postedBy",
        select: "name avatar ",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "Fetched all jobs", jobs));
});

export const getJobsPostedByCurrentUser = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ postedBy: req.user._id });

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
