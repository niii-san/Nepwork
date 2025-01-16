import { asyncHandler, ApiError } from "../utils/index.js";

/*NOTE: this middle ware is for checking if the email and kyc are verified or not*/
export const verified = asyncHandler(async (req, _, next) => {
    if (!req.user.emailVerified) {
        throw new ApiError(401, false, "Email not verified");
    }

    if (!req.user.kycVerified) {
        throw new ApiError(401, false, "Kyc not verified");
    }

    next();
});
