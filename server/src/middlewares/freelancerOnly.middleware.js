import { asyncHandler, ApiError } from "../utils/index.js";

export const freelancerOnly = asyncHandler(async (req, _, next) => {
    if (!req.user.role === "freelancer")
        throw new ApiError(401, true, "Only freelancer is allowed for this");

    next();
});
