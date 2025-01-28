import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import toast from "react-hot-toast";
import Button from "./Button";

function KycForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const documentFile = watch("documentFile");

    const [resErrMsg, setResErrMsg] = useState(null);
    const currentYear = new Date().getFullYear() + 57;
    const [uploading, setUploading] = useState(false);

    const onSubmit = (data) => {
        setUploading(true);
        // create structured payload and hit endpoint
        const payload = new FormData();
        //loading name
        payload.append("firstName", data.firstName);
        payload.append("middleName", data.middleName || "");
        payload.append("lastName", data.lastName);
        payload.append("gender", data.gender);
        payload.append("phoneNumber", data.phone);

        //loading dob
        payload.append("dobYear", data.year);
        payload.append("dobMonth", data.month);
        payload.append("dobDay", data.day);

        // loading address
        payload.append("temporaryCountry", data.temporaryCountry);
        payload.append("temporaryState", data.temporaryState);
        payload.append("temporaryCity", data.temporaryCity);

        payload.append("permanentCountry", data.permanentCountry);
        payload.append("permanentState", data.permanentState);
        payload.append("permanentCity", data.permanentCity);

        // loading documents
        payload.append("documentId", data.documentId);
        payload.append("documentType", data.documentType);
        payload.append("documentFile", data.documentFile[0]);

        console.log(payload);

        api.post("/user/upload-kyc", payload)
            .then((res) => {
                toast.success(res.data.message);
                navigate("/settings");
            })
            .catch((err) => {
                setResErrMsg(err.response.data.message);
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const inputStyling = `mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 bg-tertiary text-secondaryText`;
    // styling for bold header
    const headerStyle =
        "text-xl font-bold text-primary border-b-2 border-primary pb-2 mb-4";

    const gridCols = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

    const AddressSection = ({ title, prefix }) => (
        <div className="space-y-4">
            <h2 className={headerStyle}>{title}</h2>
            <div className={gridCols}>
                <div>
                    <label className="block text-sm font-medium text-secondaryText">
                        Country
                    </label>
                    <input
                        type="text"
                        id={`${prefix}Country`}
                        {...register(`${prefix}Country`, {
                            required: "Country is required",
                        })}
                        className={inputStyling}
                    />
                    {errors[`${prefix}Country`] && (
                        <p className="text-danger text-sm mt-1">
                            {errors[`${prefix}Country`].message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondaryText">
                        State
                    </label>
                    <input
                        type="text"
                        id={`${prefix}State`}
                        {...register(`${prefix}State`, {
                            required: "State is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Can only contain numbers",
                            },
                        })}
                        className={inputStyling}
                    />
                    {errors[`${prefix}State`] && (
                        <p className="text-danger text-sm mt-1">
                            {errors[`${prefix}State`].message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-secondaryText">
                        City
                    </label>
                    <input
                        type="text"
                        id={`${prefix}City`}
                        {...register(`${prefix}City`, {
                            required: "City is required",
                        })}
                        className={inputStyling}
                    />
                    {errors[`${prefix}City`] && (
                        <p className="text-danger text-sm mt-1">
                            {errors[`${prefix}City`].message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-secondary py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-tertiary rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-primaryText bg-primary p-4 rounded-lg mb-8">
                    KYC Verification Form
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    className="space-y-8"
                >
                    {/* Name Section */}
                    <div className="space-y-4">
                        <h2 className={headerStyle}>Personal Information</h2>
                        <div className={gridCols}>
                            <div>
                                <label className="block text-sm font-medium text-secondaryText">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    {...register("firstName", {
                                        required: "First name is required",
                                        pattern: {
                                            value: /^[A-Za-z]+$/,
                                            message: "Letters only",
                                        },
                                    })}
                                    className={inputStyling}
                                />
                                {errors.firstName && (
                                    <p className="text-danger text-sm mt-1">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondaryText">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    id="middleName"
                                    {...register("middleName", {
                                        pattern: {
                                            value: /^[A-Za-z]+$/,
                                            message: "Letters only",
                                        },
                                    })}
                                    className={inputStyling}
                                />
                                {errors.middleName && (
                                    <p className="text-danger text-sm mt-1">
                                        {errors.middleName.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondaryText">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    {...register("lastName", {
                                        required: "Last name is required",
                                        pattern: {
                                            value: /^[A-Za-z]+$/,
                                            message: "Letters only",
                                        },
                                    })}
                                    className={inputStyling}
                                />
                                {errors.lastName && (
                                    <p className="text-danger text-sm mt-1">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Date of Birth Section */}
                    <div className="space-y-4">
                        <h2 className={headerStyle}>
                            Date of Birth (Bikram Sambat - BS)
                        </h2>
                        <div className={gridCols}>
                            {["year", "month", "day"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-secondaryText capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type="number"
                                        id={field}
                                        {...register(field, {
                                            required: `${field} is required`,
                                            valueAsNumber: true,
                                            ...(field === "year" && {
                                                min: {
                                                    value: 1980,
                                                    message: "Minimum 1980",
                                                },
                                                max: {
                                                    value: currentYear,
                                                    message: `Maximum ${currentYear}`,
                                                },
                                            }),
                                            ...(field === "month" && {
                                                validate: (v) =>
                                                    (v >= 1 && v <= 12) ||
                                                    "Invalid month",
                                            }),
                                            ...(field === "day" && {
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1",
                                                },
                                                max: {
                                                    value: 32,
                                                    message: "Maximum 32",
                                                },
                                            }),
                                        })}
                                        className={inputStyling}
                                    />
                                    {errors[field] && (
                                        <p className="text-danger text-sm mt-1">
                                            {errors[field].message}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gender and Phone Section */}
                    <div className={gridCols}>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-secondaryText">
                                Gender
                            </label>
                            <select
                                id="gender"
                                {...register("gender", {
                                    validate: (v) =>
                                        v !== "not_selected" ||
                                        "Please select gender",
                                })}
                                className={`${inputStyling} cursor-pointer`}
                            >
                                <option value="not_selected">
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.gender && (
                                <p className="text-danger text-sm mt-1">
                                    {errors.gender.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-secondaryText">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className={inputStyling}
                            />
                            {errors.phone && (
                                <p className="text-danger text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Address Sections */}
                    <AddressSection
                        title="Permanent Address"
                        prefix="permanent"
                    />
                    <AddressSection
                        title="Temporary Address"
                        prefix="temporary"
                    />

                    {/* Document Section */}
                    <div className="space-y-4">
                        <h2 className={headerStyle}>Document Verification</h2>
                        <div className="space-y-6">
                            <div className={gridCols}>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-secondaryText">
                                        Document Type
                                    </label>
                                    <select
                                        id="documentType"
                                        {...register("documentType", {
                                            required: "Type is required",
                                        })}
                                        className={`${inputStyling} cursor-pointer`}
                                    >
                                        <option value="citizenship">
                                            Citizenship
                                        </option>
                                        <option value="driving_license">
                                            Driving License
                                        </option>
                                        <option value="passport">
                                            Passport
                                        </option>
                                    </select>
                                    {errors.documentType && (
                                        <p className="text-danger text-sm mt-1">
                                            {errors.documentType.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-secondaryText">
                                        Document ID
                                    </label>
                                    <input
                                        type="text"
                                        id="documentId"
                                        {...register("documentId", {
                                            required: "Document ID required",
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: "Numbers only",
                                            },
                                        })}
                                        className={inputStyling}
                                    />
                                    {errors.documentId && (
                                        <p className="text-danger text-sm mt-1">
                                            {errors.documentId.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-secondaryText">
                                    Upload Document (Front & Back)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col w-full cursor-pointer">
                                        <div className="border-2 border-dashed border-secondary rounded-lg p-6 text-center hover:border-primary transition-colors">
                                            <span className="text-primary font-medium">
                                                Choose File
                                            </span>
                                            <span className="text-sm text-secondaryText ml-2">
                                                {documentFile?.[0]?.name ||
                                                    "No file chosen"}
                                            </span>
                                        </div>
                                        <input
                                            type="file"
                                            id="documentFile"
                                            {...register("documentFile", {
                                                required: "Document required",
                                                validate: (file) =>
                                                    file?.[0]?.type.startsWith(
                                                        "image/",
                                                    ) || "Images only",
                                            })}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.documentFile && (
                                    <p className="text-danger text-sm mt-1">
                                        {errors.documentFile.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6">
                        {resErrMsg && (
                            <p className="text-danger mb-4 text-center">
                                {resErrMsg}
                            </p>
                        )}
                        <Button
                            type="submit"
                            variant="filled"
                            disabled={uploading}
                            loading={uploading}
                            className="w-full py-3 font-medium text-lg bg-primary hover:bg-primary/90 text-primaryText rounded-lg transition-colors"
                        >
                            {uploading ? "Submitting..." : "Submit KYC"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default KycForm;
