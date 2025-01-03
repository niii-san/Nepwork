import { Admin } from "../../models/admin.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createAdmin = asyncHandler(async (req, res) => {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";
    const secret_key = req.body.secret_key || "";
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

    if (!email) throw new ApiError(400, false, "Email not provided");
    if (!password) throw new ApiError(400, false, "Password not provided");
    if (!secret_key) throw new ApiError(400, false, "Secret key not provided");
    if (secret_key !== ADMIN_SECRET_KEY)
        throw new ApiError(400, false, "Invalid secret_key");

    const doesAdminAlreadyExists = await Admin.findOne({ email });
    if (doesAdminAlreadyExists)
        throw new ApiError(400, false, "Admin with this email already exists");

    const admin = await Admin.create({ email, password });

    return res.status(201).json(
        new ApiResponse(201, true, false, "Admin created", {
            email: admin.email,
        }),
    );
});
