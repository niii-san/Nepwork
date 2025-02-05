import { Transaction } from "../../models/index.js";
import { ApiResponse, asyncHandler } from "../../utils/index.js";

export const getAllTransaction = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const transactions = await Transaction.find({
        initiator: userId,
        status: "done",
    })
        .sort({ createdAt: -1 })
        .populate("jobId", "title payment _id")
        .populate("receiver", "name _id");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                "Fetched all transactions",
                transactions,
            ),
        );
});
