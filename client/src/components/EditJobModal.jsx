import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useTags } from "../contexts/tagContext";
import api from "../utils/api";
import toast from "react-hot-toast";

function EditJobModal({ jobData, setModalStatus, refetchJobFn }) {
    const { tags } = useTags();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
    } = useForm();

    const selectedTags = watch("tags", []);
    const [searchQuery, setSearchQuery] = useState("");
    const [resErr, setResErr] = useState(null);
    const [tagErr, setTagErr] = useState(null);

    // Filter tags based on search query
    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    useEffect(() => {
        if (jobData) {
            reset({
                title: jobData.title,
                description: jobData.description,
                rate: jobData.hourlyRate,
                status: jobData.status,
                tags: jobData.tags,
            });
        }
    }, [jobData, reset]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            const updatedTags = selectedTags.filter((t) => t !== tag);
            setValue("tags", updatedTags);
            setTagErr(null);
        } else {
            if (selectedTags.length >= 15) {
                setTagErr("Maximum 15 tags allowed");
                return;
            }
            setValue("tags", [...selectedTags, tag]);
            setTagErr(null);
        }
    };

    const onSubmit = async (data) => {
        if (data.tags.length === 0) {
            setTagErr("At least one tag is required");
            return;
        }

        try {
            setResErr(null);
            const payload = { ...data, id: jobData._id };
            await api.post("/jobs/update-job", payload);
            toast.success("Job updated successfully");
            await refetchJobFn();
            setModalStatus(false);
        } catch (error) {
            setResErr(error.response?.data?.message || "Failed to update job");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[800px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setModalStatus(false)}
                    className="absolute top-1 right-2 ml-auto text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full p-1 shadow-sm"
                >
                    ✕
                </button>

                <div className="p-4 pc:p-6">
                    <h1 className="text-center font-bold text-xl pc:text-2xl mb-4">
                        Edit Job Posting
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
                                    className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.title && (
                                    <p className="text-red-600 text-sm mt-1">
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
                                    className="h-[200px] tablet:h-[300px] mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                            {/* Tags Section */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tags (Max 15)
                                    </label>
                                    <span className="text-sm text-secondaryText">
                                        {selectedTags.length}/15 selected
                                    </span>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search tags..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full p-2.5 rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 mb-3"
                                />

                                <div className="max-h-[250px] overflow-y-auto p-2 border rounded-lg">
                                    {filteredTags.length === 0 ? (
                                        <div className="text-center text-gray-400 py-4">
                                            No tags found matching "
                                            {searchQuery}"
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {filteredTags.map((tag) => (
                                                <label
                                                    key={tag}
                                                    className={`
                            relative inline-flex items-center justify-center px-3 py-1.5 border rounded-lg text-sm
                            transition-colors duration-200  ${
                                selectedTags.includes(tag)
                                    ? "bg-primary/10 border-primary text-primary font-semibold"
                                    : "border-gray-300 text-gray-600 hover:border-primary/40"
                            }
                            ${
                                selectedTags.length >= 15 &&
                                !selectedTags.includes(tag)
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={tag}
                                                        checked={selectedTags?.includes(
                                                            tag,
                                                        )}
                                                        onChange={() =>
                                                            toggleTag(tag)
                                                        }
                                                        className="hidden"
                                                        disabled={
                                                            selectedTags.length >=
                                                                15 &&
                                                            !selectedTags.includes(
                                                                tag,
                                                            )
                                                        }
                                                    />
                                                    {tag}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {tagErr && (
                                    <div className="mt-2 flex items-center text-danger">
                                        <svg
                                            className="w-5 h-5 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <p className="text-sm">{tagErr}</p>
                                    </div>
                                )}
                            </div>{" "}
                            {/* Rate and Status */}
                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hourly Rate (NRS)
                                    </label>
                                    <input
                                        type="number"
                                        {...register("rate", {
                                            required: "Hourly Rate is required",
                                            valueAsNumber: true,
                                            validate: (value) =>
                                                value > 0 ||
                                                "Hourly Rate must be greater than 0",
                                        })}
                                        className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.rate && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.rate.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        {...register("status")}
                                        className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="closed">Closed</option>
                                        <option value="finished">
                                            Finished
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error Messages */}
                        {resErr && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center">
                                <svg
                                    className="w-5 h-5 text-red-500 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-red-600 text-sm">{resErr}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col tablet:flex-row gap-4 mt-8 tablet:justify-end">
                            <Button
                                variant="outline"
                                className="w-full tablet:w-auto justify-center border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => setModalStatus(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="filled"
                                type="submit"
                                className="w-full tablet:w-auto justify-center bg-primary hover:bg-primary-dark text-white"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditJobModal;
