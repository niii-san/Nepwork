import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/ApiError.js";

export const app = express();

/**
 * Basic middlewares
 */

const corsOption = {
    credentials: true,
    origin: process.env.CLIENT_URL,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

/**
 *
 *
 *
 *
 *
 *
 ** Routes
 */

//* User Route
import { userRoute } from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);

// Admin Route
import { adminRouter } from "./routes/admin.route.js";
app.use("/api/v1/admin", adminRouter);

import { kycRouter } from "./routes/kyc.route.js";
app.use("/api/v1/kyc", kycRouter);

//* Error handling
app.use(errorHandler);
