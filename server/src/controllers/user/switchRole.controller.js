import { User } from "../../models/index.js";
import { asyncHandler, ApiResponse, ApiError } from "../../utils/index.js";

const canChangeRole = (lastChangedDate) => {
    if (!lastChangedDate)
        return {
            canChange: true,
            message: "You can change role, its first time",
        };
    const daysSinceLastChange = Math.floor(
        (Date.now() - lastChangedDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const daysRemaining = 30 - daysSinceLastChange;

    if (daysRemaining <= 0) {
        return { canChange: true, message: "You can change your role now!" };
    } else {
        return {
            canChange: false,
            message: `You need to wait ${daysRemaining} more days to change your role`,
        };
    }
};

export const switchToFreelancer = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const { canChange, message } = canChangeRole(user.lastRoleChange);

    // if cannot change
    if (!canChange) throw new ApiError(400, true, message);

    // if already freelancer
    if (user.role === "freelancer")
        throw new ApiError(400, true, "You're already freelancer");

    // if can change
    user.lastRoleChange = new Date();
    user.role = "freelancer";
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, true, true, "Role changed to freelancer", {
            lastRoleChange: user.lastRoleChange,
        }),
    );
});

export const switchToClient = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                "Successfully switched to Client",
                null,
            ),
        );
});
