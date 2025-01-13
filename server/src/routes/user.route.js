import { Router } from "express";
import { authenticate, verified } from "../middlewares/index.js";

import {
    signup,
    login,
    refreshAccessToken,
    requestOtp,
    verifyEmail,
    verifyUserToken,
    currentUserInfo,
    uploadKyc,
    upload,
    switchToClient,
    switchToFreelancer,
} from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/refresh-access-token", refreshAccessToken);
userRoute.post("/request-otp", authenticate, requestOtp);
userRoute.post("/verify-email", authenticate, verifyEmail);
userRoute.get("/verify-token", authenticate, verifyUserToken);

// hanlind document upload and other form data of kyc
userRoute.post(
    "/upload-kyc",
    authenticate,
    upload.single("documentFile"),
    uploadKyc,
);
userRoute.get("/current-user-info", authenticate, currentUserInfo);

// switching roles routes

userRoute.post("/switch-to-client", authenticate, verified, switchToClient);
userRoute.post(
    "/switch-to-freelancer",
    authenticate,
    verified,
    switchToFreelancer,
);

export { userRoute };
