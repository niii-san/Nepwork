import React, { useState } from "react";
import { useUser } from "../stores";
import { Loader, Button,Note } from "../components";
import { useForm } from "react-hook-form";
import { useTags } from "../contexts/tagContext";

function Dashboard() {
    const userData = useUser((state) => state.data);

    if (!userData) return <Loader />;

    return (
        <div className="min-h-[800px] bg-secondary">
            {userData.role === "client" ? (
                <ClientDashBoard />
            ) : userData.role === "freelancer" ? (
                <FreelancerDashboard />
            ) : (
                <div className="bg-red-500 w-full h-full">
                    Something went wrong
                </div>
            )}
        </div>
    );

    // Client Dashboard
    function ClientDashBoard() {
        const [showPostJobModal, setShowPostJobModal] = useState(true);

        return (
            <>
                {showPostJobModal && <PostJobModal />}
                <div className="bg-red">
                    <h1 className="text-center">Client Dashboard</h1>

                    <Button onClick={() => setShowPostJobModal(true)}>
                        Post Job
                    </Button>
                </div>
            </>
        );

        function PostJobModal() {
            const {
                register,
                handleSubmit,
                formState: { errors },
                setValue,
                watch,
            } = useForm();

            const { tags } = useTags();
            const selectedTags = watch("tags", []);
            const [tagErr, setTagErr] = useState(null);

            const onSubmit = (data) => {
                if (selectedTags.length === 0) {
                    setTagErr("Atleast one tag is required");
                } else {
                    if (tagErr) setTagErr(null);
                    console.log("Form submitted:", {
                        data,
                    });
                }
            };

            const toggleTag = (tag) => {
                const updatedTags = selectedTags.includes(tag)
                    ? selectedTags.filter((t) => t !== tag)
                    : [...selectedTags, tag];
                setValue("tags", updatedTags);
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[800px] relative">
                        <h1 className="text-center font-bold text-2xl mb-4">
                            Post Job
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div id="postJobBody" className="space-y-4">
                                {/* Job Title */}
                                <div>
                                    <label
                                        htmlFor="jobTitle"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        id="jobTitle"
                                        {...register("jobTitle", {
                                            required: "Job Title is required",
                                        })}
                                        className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-red-600 text-sm">
                                            {errors.jobTitle.message}
                                        </p>
                                    )}
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label
                                        htmlFor="jobDescription"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Job Description
                                    </label>
                                    <textarea
                                        id="jobDescription"
                                        {...register("jobDescription", {
                                            required:
                                                "Job Description is required",
                                        })}
                                        className="h-[200px] mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                                    ></textarea>
                                    {errors.jobDescription && (
                                        <p className="text-red-600 text-sm">
                                            {errors.jobDescription.message}
                                        </p>
                                    )}
                                </div>

                                {/* Tags */}
                                <div className="">
                                    <Note>
                                        Tags are helpful for better reach
                                    </Note>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {tags.map((tag) => (
                                            <label
                                                key={tag}
                                                className={`cursor-pointer inline-flex items-center px-3 py-1 border rounded-xl text-sm ${
                                                    selectedTags.includes(tag)
                                                        ? "bg-primary text-white border-blue-500"
                                                        : "bg-gray-200 text-gray-700 border-gray-300"
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={tag}
                                                    checked={selectedTags.includes(
                                                        tag,
                                                    )}
                                                    onChange={() =>
                                                        toggleTag(tag)
                                                    }
                                                    className="hidden"
                                                />
                                                {tag}
                                            </label>
                                        ))}
                                        {tagErr && (
                                            <p className="text-red-600 text-sm">
                                                {tagErr}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Hourly Rate */}
                                <div>
                                    <label
                                        htmlFor="hourlyRate"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Hourly Rate (NRS)
                                    </label>
                                    <input
                                        type="number"
                                        id="hourlyRate"
                                        {...register("hourlyRate", {
                                            required: "Hourly Rate is required",
                                            valueAsNumber: true,
                                            validate: (value) =>
                                                value > 0 ||
                                                "Hourly Rate must be greater than 0",
                                        })}
                                        className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                                    />
                                    {errors.hourlyRate && (
                                        <p className="text-red-600 text-sm">
                                            {errors.hourlyRate.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div
                                id="btns"
                                className="flex justify-evenly mt-10"
                            >
                                <Button
                                    variant="outline"
                                    className="border-red-500 text-red-500"
                                    onClick={() => setShowPostJobModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="filled"
                                    className=""
                                    type="submit"
                                >
                                    Post Job
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }

    // Freelancer Dashboard
    function FreelancerDashboard() {
        return <div className="bg-red">this is freelancer dashboard</div>;
    }
}

export default Dashboard;
