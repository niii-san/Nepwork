import { ApiError, asyncHandler } from "../utils/index.js";

export const clientOnly = asyncHandler(async (req, _, next) => {
    if (req.user.role !== "client")
        throw new ApiError(401, true, "Only client allowed for this method ");

    next();
});
