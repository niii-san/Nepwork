import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Loader, Button } from "../components";
import { api } from "../utils";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useForm, Controller } from "react-hook-form";

function SingleKyc() {
    console.log("rendered");
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState(null);
    const [editStatus, setEditStatus] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            selectKyc: "pending",
        },
    });

    const kycStatus = watch("selectKyc");

    const onSubmit = async (formData) => {
        if (!editStatus) {
            setEditStatus(true);
        } else {
            if (formData.selectKyc !== data.status) {
                const payload = {
                    status: formData.selectKyc,
                    failedReason: formData.reason,
                };
                try {
                    const response = await api.post(
                        `/kyc/update-status/${data._id}`,
                        payload,
                    );
                    toast.success(
                        `Status updated: ${response.data.data.status}`,
                    );
                    reset();
                    fetchKyc();
                } catch (err) {
                    console.log(err);
                    toast.error(`Failed to save status, msg:`);
                }
            }
            setEditStatus(false);
        }
    };

    const fetchKyc = async () => {
        console.log("fetched");
        try {
            const response = await api.get(`/kyc/get-kyc/${params.kycId}`);
            setData(response.data.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch kyc: ");
        }
    };

    useEffect(() => {
        fetchKyc();
    }, []);
    useEffect(() => {
        if (data) {
            reset({
                selectKyc: data.status ?? "pending",
            });
        }
    }, [data]);

    if (!data) return <Loader />;

    return (
        <div className="flex flex-col justify-center items-center">
            <Button
                style="filled"
                onClick={() => navigate("/kycs")}
                className="m-2 ml-2"
            >
                Go Back
            </Button>

            <div className="border border-hover_button rounded shadow-lg w-[500px] mx-auto bg-white p-6 mb-6">
                <div className="">
                    <div id="names" className="mb-4">
                        <h3 className="text-lg font-semibold text-primary">
                            Personal Details
                        </h3>
                        <div className="flex">
                            <strong>First name:</strong>
                            <p className="ml-1">{data.name.firstName}</p>
                        </div>
                        <div className="flex">
                            {data.name.middleName && (
                                <>
                                    <strong>Middle name:</strong>
                                    <p className="ml-1">
                                        {data.name.middleName}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex">
                            <strong>Last name:</strong>
                            <p className="ml-1">{data.name.lastName}</p>
                        </div>
                        <div id="dob">
                            <strong>Date of Birth: </strong>
                            {data.dob.year}-{data.dob.month}-{data.dob.day}
                        </div>
                        <div className="flex">
                            <strong>Gender: </strong>
                            <p className="ml-1">{data.gender ?? "Male"}</p>
                        </div>
                    </div>
                    <hr className="border-hover_button" />
                    <div>
                        <h3 className="text-lg font-semibold mt-4 text-primary">
                            Address
                        </h3>
                        <strong>Permanent Address</strong>
                        <div className="flex gap-10">
                            <span className="flex gap-1">
                                <label className="font-semibold">
                                    Country:
                                </label>
                                <p>
                                    {data.address.permanent.country.toUpperCase()}
                                </p>
                            </span>
                            <span className="flex gap-1">
                                <label className="font-semibold">State:</label>
                                <p>{data.address.permanent.state}</p>
                            </span>
                            <span className="flex gap-1">
                                <label className="font-semibold">City:</label>
                                <p>
                                    {data.address.permanent.city.toUpperCase()}
                                </p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <strong>Temporary Address</strong>
                        <div className="flex gap-10 mb-4">
                            <span className="flex  gap-1">
                                <label className="font-semibold">
                                    Country:
                                </label>
                                <p>
                                    {data.address.temporary.country.toUpperCase()}
                                </p>
                            </span>
                            <span className="flex  gap-1">
                                <label className="font-semibold">State:</label>
                                <p>{data.address.temporary.state}</p>
                            </span>
                            <span className="flex  gap-1">
                                <label className="font-semibold">City:</label>
                                <p>
                                    {data.address.temporary.city.toUpperCase()}
                                </p>
                            </span>
                        </div>
                        <hr className="border-hover_button" />
                        <div id="contact" className="mb-4">
                            <h3 className="text-lg font-semibold mt-4 text-primary">
                                Contact
                            </h3>
                            <div className="flex gap-10">
                                <span className="flex  gap-1">
                                    <label className="font-semibold">
                                        Email:
                                    </label>
                                    <p>
                                        {data.contact?.email ?? "Email address"}
                                    </p>
                                </span>
                                <span className="flex  gap-1">
                                    <label className="font-semibold">
                                        Phone:
                                    </label>
                                    <p>
                                        {data.contact?.phone ?? "Phone number"}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <hr className="border-hover_button" />
                        <div id="document" className="mb-4">
                            <h3 className="text-lg font-semibold mt-4 text-primary">
                                Documents
                            </h3>
                            <div id="docInfo" className="flex gap-10">
                                <span className="flex  gap-1">
                                    <label className="font-semibold">
                                        Document Type:
                                    </label>
                                    <p>{data.document.type}</p>
                                </span>
                                <span className="flex  gap-1">
                                    <label className="font-semibold">
                                        Document Id:
                                    </label>
                                    <p>{data.document.id}</p>
                                </span>
                            </div>
                        </div>
                        <hr className="border-hover_button" />
                    </div>
                    <PhotoProvider>
                        <PhotoView src={`${data.document.url}`}>
                            <img
                                src={`${data.document.url}`}
                                alt=""
                                className="max-w-[400px] mx-auto mt-10 cursor-pointer"
                            />
                        </PhotoView>
                    </PhotoProvider>
                </div>
                <div className="mt-2">
                    <div id="status">
                        <form
                            className="justify-center p-4 flex items-center flex-col"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="justify-between w-full flex items-center">
                                <div>
                                    <label className="mr-2" htmlFor="kycStatus">
                                        KYC Status:
                                    </label>
                                    <Controller
                                        name="selectKyc"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="kycStatus"
                                                disabled={!editStatus}
                                            >
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="verified">
                                                    Verified
                                                </option>
                                                <option value="failed">
                                                    Failed
                                                </option>
                                            </select>
                                        )}
                                    />
                                </div>

                                <Button type="submit">
                                    {editStatus ? "Save" : "Edit"}
                                </Button>
                            </div>

                            {kycStatus === "failed" && (
                                <div className="w-full">
                                    <h1>Reason</h1>
                                    <textarea
                                    className="w-full border border-hover_button rounded shadow-lg"
                                        disabled={!editStatus}
                                        id="reason"
                                        {...register("reason", {
                                            validate: (value) => {
                                                if (!editStatus) return true;
                                                return (
                                                    value.trim() !== "" ||
                                                    "Reason is required"
                                                );
                                            },
                                        })}
                                        defaultValue={data?.failedReason ?? ""}
                                    />
                                    {errors.reason && (
                                        <p className="text-red-600">
                                            {errors.reason.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleKyc;
