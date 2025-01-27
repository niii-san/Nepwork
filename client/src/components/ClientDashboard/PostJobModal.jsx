import { useForm } from "react-hook-form";
import { useTags } from "../../contexts/tagContext";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { Note, Button } from "../index";
import { useState } from "react";
import { usePostedJobs } from "../../stores";

export function PostJobModal({ setShowPostJobModal }) {
    const invalidatePostedJobs = usePostedJobs(
        (state) => state.fetchPostedJobs,
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm();

    const { tags } = useTags();
    const selectedTags = watch("tags", []);
    const [tagErr, setTagErr] = useState(null);
    const [resErr, setResErr] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onSubmit = (data) => {
        if (selectedTags.length === 0) {
            setTagErr("Atleast one tag is required");
        } else {
            setUploading(true);
            if (tagErr) setTagErr(null);
            if (resErr) setResErr(null);
            const payload = {
                title: data.jobTitle,
                description: data.jobDescription,
                tags: data.tags,
                rate: data.hourlyRate,
            };

            api.post("/jobs/create-job", payload)
                .then(async (res) => {
                    toast.success(`Job posted: ${res.data.data.title}`, {
                        duration: 5000,
                    });
                    invalidatePostedJobs();
                    reset();
                    setShowPostJobModal(false);
                })
                .catch((err) => {
                    setResErr(err.response.data.message);
                })
                .finally(() => {
                    setUploading(false);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[800px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setShowPostJobModal(false)}
                    className="absolute top-0 right-4 ml-auto text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full p-1 shadow-sm"
                >
                    ✕
                </button>

                <div className="p-4 pc:p-6">
                    <h1 className="text-center font-bold text-xl pc:text-2xl mb-4">
                        Post Job
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            {/* Job Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Job Title
                                </label>
                                <input
                                    id="jobTitle"
                                    {...register("jobTitle", {
                                        required: "Job Title is required",
                                    })}
                                    className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.jobTitle && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.jobTitle.message}
                                    </p>
                                )}
                            </div>

                            {/* Job Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Job Description
                                </label>
                                <textarea
                                    id="jobDescription"
                                    {...register("jobDescription", {
                                        required: "Job Description is required",
                                    })}
                                    className="h-[200px] tablet:h-[300px] mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                ></textarea>
                                {errors.jobDescription && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.jobDescription.message}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <Note>Tags are helpful for better reach</Note>
                                <label className="block text-sm font-medium text-gray-700 mt-2">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag) => (
                                        <label
                                            key={tag}
                                            className={`cursor-pointer inline-flex items-center px-2 py-1 tablet:px-3 tablet:py-1 border rounded-xl text-xs tablet:text-sm ${selectedTags.includes(tag)
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                value={tag}
                                                checked={selectedTags.includes(
                                                    tag,
                                                )}
                                                onChange={() => toggleTag(tag)}
                                                className="hidden"
                                            />
                                            {tag}
                                        </label>
                                    ))}
                                </div>
                                {errors.tags && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.tags.message}
                                    </p>
                                )}
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Hourly Rate (NRS)
                                </label>
                                <input
                                    type="number"
                                    id="hourlyRate"
                                    min="1"
                                    step="1"
                                    {...register("hourlyRate", {
                                        required: "Hourly Rate is required",
                                        valueAsNumber: true,
                                        validate: (value) =>
                                            value > 0 ||
                                            "Hourly Rate must be greater than 0",
                                    })}
                                    className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.hourlyRate && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.hourlyRate.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Root Error */}
                        {errors.root && (
                            <p className="text-red-600 text-sm mt-4">
                                {errors.root.message}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col tablet:flex-row gap-4 mt-8 tablet:justify-end">
                            <Button
                                variant="outline"
                                className="w-full tablet:w-auto justify-center border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => setShowPostJobModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                loading={uploading}
                                disabled={uploading}
                                variant="filled"
                                type="submit"
                                className="w-full tablet:w-auto justify-center bg-primary hover:bg-primary-dark text-white"
                            >
                                Post Job
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
