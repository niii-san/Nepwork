import { ApiResponse, asyncHandler } from "../../utils/index.js";

export const getAllKyc = asyncHandler(async (_, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, true, true, "Test passed", null));
});
