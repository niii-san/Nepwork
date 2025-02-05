import mongoose from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { Job, Transaction, User } from "../../models/index.js";

export const payTransaction = asyncHandler(async (req, res) => {
    const { tId } = req.params;
    const userId = req.user.id;
    const reqAmount = req.body.amount;
    const amount = Number(reqAmount.replace(/,/g, ""));

    const transactionCode = (req.body.transactionCode ?? "").trim();
    const transactionUUID = (req.body.transactionUUID ?? "").trim();

    if (!mongoose.isValidObjectId(tId)) {
        throw new ApiError(400, true, "Invalid transaction id");
    }

    if (!amount) {
        throw new ApiError(400, true, "Amount is required");
    }

    if (isNaN(amount)) {
        throw new ApiError(400, true, "Amount must be in number");
    }

    if (!transactionCode) {
        throw new ApiError(400, true, "Transaction code is required");
    }

    if (!transactionUUID) {
        throw new ApiError(400, true, "Transaction UUID is required");
    }

    const transaction = await Transaction.findOne({
        _id: tId,
        initiator: userId,
    });

    if (!transaction) {
        throw new ApiError(404, true, "Transaction not found");
    }

    if (transaction.status === "done") {
        throw new ApiError(400, true, "Transaction already done");
    }

    if (transaction.amount != amount) {
        throw new ApiError(400, true, "Insufficient amount was paid");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const job = await Job.findById(transaction.jobId);
        const receiver = await User.findById(transaction.receiver);
        job.payment.done = true;
        receiver.balance += amount;
        transaction.status = "done";
        transaction.paidTime = Date.now();
        transaction.transactionUUID = transactionUUID;
        transaction.transactionCode = transactionCode;
        await Promise.all([job.save(), receiver.save(), transaction.save()]);
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        throw new ApiError(500, true, "Something went wrong");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                true,
                true,
                "Job transaction paid",
                transaction,
            ),
        );
});
