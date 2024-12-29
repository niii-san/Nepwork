import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Loader, UserCard } from "../components";
import { useUser } from "../stores";

function Kyc() {
    const navigate = useNavigate();
    const userData = useUser((state) => state.data);
    const invalidateUserData = useUser((state) => state.setUserData);
    console.log(userData);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [resErrMsg, setResErrMsg] = useState(null);
    const currentYear = new Date().getFullYear() + 57;

    const onSubmit = (data) => {
        // create structured payload and hit endpoint
        const payload = {
            name: {
                firstName: data.firstName.trim(),
                middleName: data.middleName || "",
                lastName: data.lastName,
            },
            dob: {
                year: data.year,
                month: data.month,
                day: data.day,
            },
            address: {
                temporary: {
                    country: data.temporaryCountry,
                    state: data.temporaryState,
                    city: data.temporaryCity,
                },
                permanent: {
                    country: data.permanentCountry,
                    state: data.permanentState,
                    city: data.permanentCity,
                },
            },
            document: {
                file: data.documentFile,
                id: data.documentId,
                type: data.documentType,
            },
        };

        api.post("/user/upload-kyc", payload)
            .then((res) => {
                toast.success(res.data.message);
                navigate("/settings");
            })
            .catch((err) => {
                setResErrMsg(err.response.data.message);
            });

        console.log(payload);
    };

    const inputStyling = "border border-black";

    // Invalidating user info before any operation here
    useEffect(() => {
        invalidateUserData();
    }, []);

    if (!userData) {
        return <Loader />;
    }

    if (userData.kycStatus === "pending") {
        return (
            <>
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="mx-auto text-3xl mt-12">
                        Your Kyc is pending, Please wait or contact officals
                    </h1>

                    {userData && <UserCard userData={userData} />}
                </div>
            </>
        );
    }

    // if kyc status is "not_uploaded"
    if (userData.kycStatus === "not_uploaded") {
        return (
            <>
                <div>
                    You have not submited Kyc form, Please fill up and submit
                </div>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Name</h1>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("firstName", {
                                required: "First name is required",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "Can only contain letters",
                                },
                            })}
                            className={inputStyling}
                        />

                        {errors.firstName && (
                            <p className="text-red-500">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle name</label>
                        <input
                            type="text"
                            id="middleName"
                            {...register("middleName", {
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "Can only contain letters",
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.middleName && (
                            <p className="text-red-500">
                                {errors.middleName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("lastName", {
                                required: "Last name is required",
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: "Can only contain letters",
                                },
                            })}
                            className={inputStyling}
                        />

                        {errors.lastName && (
                            <p className="text-red-500">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                    <h1>Date of Birth (Bikram Sambat - BS)</h1>
                    {/* Year Input */}
                    <div>
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            {...register("year", {
                                required: "Year is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1980,
                                    message: "Year must be 1980 or later",
                                },
                                max: {
                                    value: currentYear,
                                    message: `Year cannot be later than ${currentYear}`,
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.year && (
                            <p className="text-red-500">
                                {errors.year.message}
                            </p>
                        )}
                    </div>
                    {/* Month Input */}
                    <div>
                        <label htmlFor="month">Month</label>
                        <input
                            type="number"
                            id="month"
                            {...register("month", {
                                required: "Month is required",
                                valueAsNumber: true,
                                validate: (value) =>
                                    (value >= 1 && value <= 12) ||
                                    "Enter a valid month (1-12)",
                            })}
                            className={inputStyling}
                        />
                        {errors.month && (
                            <p className="text-red-500">
                                {errors.month.message}
                            </p>
                        )}
                    </div>
                    {/* Day Input */}
                    <div>
                        <label htmlFor="day">Day</label>
                        <input
                            type="number"
                            id="day"
                            {...register("day", {
                                required: "Day is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Day must be at least 1",
                                },
                                max: {
                                    value: 32,
                                    message: `Invalid day, too high?`,
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.day && (
                            <p className="text-red-500">{errors.day.message}</p>
                        )}
                    </div>
                    {/*Permanent address*/}
                    <h1>Permanent address</h1>
                    <div>
                        <label htmlFor="permanentCountry">Country</label>
                        <input
                            type="text"
                            id="permanentCountry"
                            {...register("permanentCountry", {
                                required: "Country is required",
                            })}
                            className={inputStyling}
                        />{" "}
                        {errors.permanentCountry && (
                            <p className="text-red-500">
                                {errors.permanentCountry.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="permanentState">State</label>
                        <input
                            type="text"
                            id="permanentState"
                            {...register("permanentState", {
                                required: "State is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Can only contain number",
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.permanentState && (
                            <p className="text-red-500">
                                {errors.permanentState.message}
                            </p>
                        )}{" "}
                    </div>
                    <div>
                        <label htmlFor="permanentCity">City</label>
                        <input
                            type="text"
                            id="permanentCity"
                            {...register("permanentCity", {
                                required: "City is required",
                            })}
                            className={inputStyling}
                        />
                        {errors.permanentCity && (
                            <p className="text-red-500">
                                {errors.permanentCity.message}
                            </p>
                        )}
                    </div>
                    {/* Temporary address */}
                    <h1>Temporary Address</h1>
                    <div>
                        <label htmlFor="temporaryCountry">Country</label>
                        <input
                            type="text"
                            id="temporaryCountry"
                            {...register("temporaryCountry", {
                                required: "Country is required",
                            })}
                            className={inputStyling}
                        />
                        {errors.temporaryCountry && (
                            <p className="text-red-500">
                                {errors.temporaryCountry.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="temporaryState">State</label>
                        <input
                            type="text"
                            id="temporaryState"
                            {...register("temporaryState", {
                                required: "State is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Can only contain number",
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.temporaryState && (
                            <p className="text-red-500">
                                {errors.temporaryState.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="temporaryCity">City</label>
                        <input
                            type="text"
                            id="temporaryCity"
                            {...register("temporaryCity", {
                                required: "City is required",
                            })}
                            className={inputStyling}
                        />
                        {errors.temporaryCity && (
                            <p className="text-red-500">
                                {errors.temporaryCity.message}
                            </p>
                        )}
                    </div>
                    {/*Documents*/}
                    <div>
                        <label htmlFor="documentType">Document Type</label>
                        <select
                            id="documentType"
                            {...register("documentType", {
                                required: "Type is required",
                            })}
                            className={inputStyling}
                        >
                            <option value="citizenship">Citizenship</option>
                            <option value="driving_license">
                                Driving license
                            </option>
                            <option value="passport">Passport</option>
                        </select>
                        {errors.documentType && (
                            <p className="text-red-500">
                                {errors.documentType.message}
                            </p>
                        )}
                    </div>
                    {/* Document ID Number */}
                    <div>
                        <label htmlFor="documentId">Document ID Number</label>
                        <input
                            type="text"
                            id="documentId"
                            {...register("documentId", {
                                required: "Document Id is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Id must only contain numbers",
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.documentId && (
                            <p className="text-red-500">
                                {errors.documentId.message}
                            </p>
                        )}
                    </div>{" "}
                    <div>
                        <label htmlFor="documentFile">
                            Document (front and back both)
                        </label>
                        <input
                            type="file"
                            id="documentFile"
                            {...register("documentFile", {
                                required: "Document photo is required",
                                validate: (file) => {
                                    if (
                                        file &&
                                        !file[0]?.type.startsWith("image/")
                                    ) {
                                        return "Only image files are allowed";
                                    }
                                    return true;
                                },
                            })}
                            className={inputStyling}
                        />
                        {errors.documentFile && (
                            <p className="text-red-500">
                                {errors.documentFile.message}
                            </p>
                        )}
                    </div>
                    <br />
                    <br />
                    {resErrMsg && <p className="text-red-500">{resErrMsg}</p>}
                    <br />
                    <button type="submit">Submit Kyc</button>
                </form>
            </>
        );
    }
}

export default Kyc;
