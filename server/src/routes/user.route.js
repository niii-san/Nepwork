import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware.js";
import { upload } from "../controllers/uploadKyc.controller.js";

import {
    signup,
    login,
    refreshAccessToken,
    requestOtp,
    verifyEmail,
    verifyToken,
    currentUserInfo,
    uploadKyc,
} from "../controllers/index.js";

const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/refresh-access-token", refreshAccessToken);
userRoute.post("/request-otp", authenticate, requestOtp);
userRoute.post("/verify-email", authenticate, verifyEmail);
userRoute.get("/verify-token", authenticate, verifyToken);

// hanlind document upload and other form data of kyc
userRoute.post(
    "/upload-kyc",
    authenticate,
    upload.single("documentFile"),
    uploadKyc,
);
userRoute.get("/current-user-info", authenticate, currentUserInfo);

export { userRoute };
