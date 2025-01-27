import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useTags } from "../contexts/tagContext";

function EditJobModal({ jobData, setModalStatus }) {
    const { tags } = useTags();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
        watch,
        clearErrors,
    } = useForm();

    const selectedTags = watch("tags", []);

    // Initialize form with job data
    useEffect(() => {
        if (jobData) {
            reset({
                title: jobData.title,
                description: jobData.description,
                hourlyRate: jobData.hourlyRate,
                status: jobData.status,
                tags: jobData.tags,
            });
        }
    }, [jobData, reset]);

    const toggleTag = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        setValue("tags", updatedTags);

        if (updatedTags.length === 0) {
            setError("tags", {
                type: "manual",
                message: "At least one tag is required",
            });
        } else {
            clearErrors("tags");
        }
    };

    const onSubmit = (data) => {
        if (data.tags.length === 0) {
            setError("tags", {
                type: "manual",
                message: "At least one tag is required",
            });
            return;
        }

        console.log("Updated job data:", data);
        setModalStatus(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[800px] relative">
                <button
                    onClick={() => setModalStatus(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h1 className="text-center font-bold text-2xl mb-4">
                    Editing Job
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Job Title
                            </label>
                            <input
                                {...register("title", {
                                    required: "Job Title is required",
                                })}
                                className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.title && (
                                <p className="text-red-600 text-sm">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Job Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Job Description
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Job Description is required",
                                })}
                                className="h-[300px] max-h-[300px] mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags?.map((tag) => (
                                    <label
                                        key={tag}
                                        className={`cursor-pointer inline-flex items-center px-3 py-1 border rounded-xl text-sm border-gray-400 ${selectedTags?.includes(tag)
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            value={tag}
                                            checked={selectedTags?.includes(
                                                tag,
                                            )}
                                            onChange={() => toggleTag(tag)}
                                            className="hidden"
                                        />
                                        {tag}
                                    </label>
                                ))}
                                {errors.tags && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.tags.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Hourly Rate (NRS)
                            </label>
                            <input
                                type="number"
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

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="mt-1 peer p-2 w-full bg-transparent outline-none px-4 text-base rounded-md bg-white border border-hover_button focus:shadow-md"
                            >
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-evenly mt-10">
                        <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500"
                            onClick={() => setModalStatus(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="filled" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditJobModal;
