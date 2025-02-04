import mongoose, { isValidObjectId } from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { Job } from "../../models/index.js";
import { Transaction } from "../../models/transaction.model.js";

export const getTransaction = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    if (!isValidObjectId(jobId)) {
        throw new ApiError(400, true, "Invalid jobId");
    }

    const job = await Job.findOne({
        _id: jobId,
        postedBy: userId,
    });

    if (!job) {
        throw new ApiError(404, true, "Job not found");
    }

    if (job.status !== "finished") {
        throw new ApiError(400, true, "Job is not finished yet");
    }

    if (!job.transaction) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const transaction = await Transaction.create({
                status: "pending",
                jobId: job._id,
                initiator: job.postedBy,
                receiver: job.acceptedFreelancer,
                amount: job.payment.amount,
            });
            job.transaction = transaction;

            await job.save();
            await session.commitTransaction();
            await session.endSession();
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        true,
                        true,
                        "Transaction created",
                        transaction,
                    ),
                );
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new ApiError(500, true, "Failed to get/create transaction");
        }
    } else {
        const transaction = await Transaction.findById(job.transaction);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    true,
                    true,
                    "Transaction fetched",
                    transaction,
                ),
            );
    }
});
