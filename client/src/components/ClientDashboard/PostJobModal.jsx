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
    const [searchQuery, setSearchQuery] = useState("");

    // Filter tags based on search query
    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const onSubmit = (data) => {
        if (selectedTags.length === 0) {
            setTagErr("At least one tag is required");
        } else {
            setUploading(true);
            setTagErr(null);
            setResErr(null);

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
                    setResErr(
                        err.response?.data?.message || "Failed to post job",
                    );
                })
                .finally(() => {
                    setUploading(false);
                });
        }
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setValue(
                "tags",
                selectedTags.filter((t) => t !== tag),
            );
        } else {
            if (selectedTags.length >= 15) {
                setTagErr("Maximum 15 tags allowed");
                return;
            }
            setValue("tags", [...selectedTags, tag]);
            setTagErr(null);
        }
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

                            {/* Tags Section */}
                            <div>
                                <Note>
                                    Tags are helpful for better reach (Max 15
                                    tags)
                                </Note>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        placeholder="Search tags..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full p-2.5 rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 mb-3"
                                    />

                                    <div className="text-sm text-gray-500 mb-2">
                                        Selected: {selectedTags.length}/15
                                    </div>

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
                                                            transition-colors duration-200 ${
                                                                selectedTags.includes(
                                                                    tag,
                                                                )
                                                                    ? "bg-primary/10 border-primary text-primary font-semibold"
                                                                    : "border-gray-300 text-gray-600 hover:border-primary/40"
                                                            }
                                                            ${
                                                                selectedTags.length >=
                                                                    15 &&
                                                                !selectedTags.includes(
                                                                    tag,
                                                                )
                                                                    ? "opacity-50 cursor-not-allowed"
                                                                    : "cursor-pointer"
                                                            }
                                                        `}
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
                                </div>
                                {tagErr && (
                                    <p className="text-red-600 text-sm mt-2">
                                        {tagErr}
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
                                {uploading ? "Posting..." : "Post Job"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
