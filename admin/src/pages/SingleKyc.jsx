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

    const onSubmit = (formData) => {
        if (!editStatus) {
            setEditStatus(true);
        } else {
            if (formData.selectKyc !== data.status) {
                console.log(formData);
            }
            setEditStatus(false);
        }
    };

    useEffect(() => {
        const fetchKyc = async () => {
            try {
                const response = await api.get(`/kyc/get-kyc/${params.kycId}`);
                setData(response.data.data);
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch kyc: ");
            }
        };

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
        <div>
            <Button
                style="filled"
                onClick={() => navigate("/kycs")}
                className="mt-2 ml-2"
            >
                Go Back
            </Button>

            <div className="w-[600px] mx-auto bg-primary">
                <div id="names" className="flex">
                    <strong>First name:</strong>
                    <p>{data.name.firstName}</p>
                    <strong>
                        {data.name.middleName && (
                            <>
                                <strong>Middle name</strong>
                                <p>{data.name.middleName}</p>
                            </>
                        )}
                    </strong>
                    <strong>Last name:</strong>
                    <p>{data.name.lastName}</p>
                </div>
                <div id="dob">
                    <strong>Date of Birth: </strong>
                    {data.dob.year}-{data.dob.month}-{data.dob.day}
                </div>
                <div className="flex">
                    <strong>Gender: </strong>
                    <p>{data.gender ?? "Male"}</p>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Permanent Address</h1>
                    <div className="flex justify-evenly">
                        <span className="flex">
                            <strong>Country:</strong>
                            <p>
                                {data.address.permanent.country.toUpperCase()}
                            </p>
                        </span>
                        <span className="flex">
                            <strong>State:</strong>
                            <p>{data.address.permanent.state}</p>
                        </span>
                        <span className="flex">
                            <strong>City:</strong>
                            <p>{data.address.permanent.city.toUpperCase()}</p>
                        </span>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Temporary Address</h1>
                    <div className="flex justify-evenly">
                        <span className="flex">
                            <strong>Country:</strong>
                            <p>
                                {data.address.temporary.country.toUpperCase()}
                            </p>
                        </span>
                        <span className="flex">
                            <strong>State:</strong>
                            <p>{data.address.temporary.state}</p>
                        </span>
                        <span className="flex">
                            <strong>City:</strong>
                            <p>{data.address.temporary.city.toUpperCase()}</p>
                        </span>
                    </div>
                    <div id="contact">
                        <h1 className="text-2xl font-bold">Contact</h1>
                        <div className="flex">
                            <span className="flex">
                                <strong>Email:</strong>
                                <p>{data.contact?.email ?? "Email address"}</p>
                            </span>
                            <span className="flex">
                                <strong>Phone:</strong>
                                <p>{data.contact?.phone ?? "Phone number"}</p>
                            </span>
                        </div>
                    </div>
                    <div id="document" className="">
                        <div id="docInfo" className="flex">
                            <span className="flex">
                                <strong>Document Type:</strong>
                                <p>{data.document.type}</p>
                            </span>
                            <span className="flex">
                                <strong>Document Id:</strong>
                                <p>{data.document.id}</p>
                            </span>
                        </div>
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
            </div>
            <div className="w-[600px] mx-auto">
                <div id="status">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="kycStatus">KYC Status:</label>
                        <Controller
                            name="selectKyc"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="kycStatus"
                                    disabled={!editStatus}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="verified">Verified</option>
                                    <option value="failed">Failed</option>
                                </select>
                            )}
                        />
                        <Button type="submit">
                            {editStatus ? "Save" : "Edit"}
                        </Button>

                        {kycStatus === "failed" && (
                            <div>
                                <h1>Reason</h1>
                                <textarea
                                    disabled={!editStatus}
                                    id="reason"
                                    {...register("reason")}
                                    defaultValue={data?.failedReason ?? ""}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SingleKyc;
