import asyncHandler from "../utils/asyncHandler.js";
import { Kyc } from "../models/kyc.model.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const uploadKyc = asyncHandler(async (req, res) => {
    const body = req.body;

    /*
     * Validation for Name
     * */
    if (!body.name) {
        return res
            .status(400)
            .json(new ApiError(400, true, "Name object not provided"));
    }
    //Name
    const firstName = (body.name.firstName || "").trim();
    const middleName = (body.name.middleName || "").trim();
    const lastName = (body.name.lastName || "").trim();

    if (!firstName) {
        return res
            .status(400)
            .json(new ApiError(400, true, "NAME: First name not provided"));
    }

    if (!lastName) {
        return res
            .status(400)
            .json(new ApiError(400, true, "NAME: Last name not provided"));
    }

    /*
     * Validation for DOB
     * */

    if (!body.dob) {
        return res
            .status(400)
            .json(new ApiError(400, true, "DOB object not provided"));
    }
    // Date of birth
    const year = body.dob.year || 0;
    const month = body.dob.month || 0;
    const day = body.dob.day || 0;

    if (!year) {
        return res
            .status(400)
            .json(new ApiError(400, true, "DOB: year not provided"));
    }
    if (!month) {
        return res
            .status(400)
            .json(new ApiError(400, true, "DOB: month not provided"));
    }

    if (!day) {
        return res
            .status(400)
            .json(new ApiError(400, true, "DOB: day not provided"));
    }

    /*
     * Validation for document
     * */

    if (!body.document) {
        return res
            .status(400)
            .json(new ApiError(400, true, "Document object not provided"));
    }

    //TODO: handle document uplaod
    const documentIdNumber = body.document.id || 0;
    const documentType = (body.document.type || "").trim().toLowerCase();

    //TODO: handle this for now random string
    // const documentFile = body.document.file
    const documentFile = "randomfordemo";

    if (!documentIdNumber) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "DOCUMENT: Document id number not provided",
                ),
            );
    }

    if (!documentType) {
        return res
            .status(400)
            .json(
                new ApiError(400, true, "DOCUMENT: Document type not provided"),
            );
    }

    const allowedDocTypes = ["citizenship", "passport", "driving_license"];

    if (!allowedDocTypes.includes(documentType)) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "Invalid document type, it must be 'citizenship' or 'passport' or 'driving_license'",
                ),
            );
    }

    /*
     * Validation for address
     * */
    if (!body.address) {
        return res
            .status(400)
            .json(new ApiError(400, true, "Address object not provided"));
    }

    /*
     * Validation for temporary address
     * */
    if (!body.address.temporary) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "Temporary address object not provided",
                ),
            );
    }

    const tempCountry = (body.address.temporary.country || "")
        .trim()
        .toLowerCase();

    const tempState = body.address.temporary.state || 0;

    const tempCity = (body.address.temporary.city || "").trim().toLowerCase();

    if (!tempCountry) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "TEMPORARY ADDRESS: country not provided",
                ),
            );
    }

    if (!tempState) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "TEMPORARY ADDRESS: state not provided",
                ),
            );
    }
    if (!tempCity) {
        return res
            .status(400)
            .json(
                new ApiError(400, true, "TEMPORARY ADDRESS: city not provided"),
            );
    }

    /*
     * Validation for permanent address
     * */

    if (!body.address.permanent) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "Permanent address object not provided",
                ),
            );
    }

    const permanCountry = (body.address.permanent.country || "")
        .trim()
        .toLowerCase();

    const permanState = body.address.permanent.state || 0;

    const permanCity = (body.address.permanent.city || "").trim().toLowerCase();

    if (!permanCountry) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "PERMANENT ADDRESS: country not provided",
                ),
            );
    }

    if (!permanState) {
        return res
            .status(400)
            .json(
                new ApiError(
                    400,
                    true,
                    "PERMANENT ADDRESS: state not provided",
                ),
            );
    }

    if (!permanCity) {
        return res
            .status(400)
            .json(
                new ApiError(400, true, "PERMANENT ADDRESS: city not provided"),
            );
    }

    const user = await User.findById(req.user.id);

    const alreadySubmittedKyc = await Kyc.findOne({ user });

    if (alreadySubmittedKyc) {
        if (!alreadySubmittedKyc.verified) {
            return res
                .status(400)
                .json(
                    new ApiError(
                        400,
                        true,
                        "Your kyc is pending, Please wait or contact officials",
                    ),
                );
        }

        return res
            .status(400)
            .json(new ApiError(400, true, "Your kyc is already verified"));
    }

    const kyc = await Kyc.create({
        user: user,
        name: { firstName, middleName, lastName },
        dob: { year, month, day },
        document: {
            file: documentFile,
            id: documentIdNumber,
            type: documentType,
        },
        address: {
            temporary: {
                country: tempCountry,
                state: tempState,
                city: tempCity,
            },
            permanent: {
                country: permanCountry,
                state: permanState,
                city: permanCity,
            },
        },
    });

    //after successfull validations change kyc status to pending
    user.kycStatus = "pending";
    user.kyc = kyc;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, true, true, "Kyc uploaded successfully", {
            name: kyc.name,
            email: kyc.user.email,
        }),
    );
});
