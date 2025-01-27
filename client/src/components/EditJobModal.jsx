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

        const payload = data;

        console.log("payload: ", payload);
        console.log(haveValuesChanged(jobData, payload));
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

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags?.map((tag) => (
                                        <label
                                            key={tag}
                                            className={`cursor-pointer inline-flex items-center px-2 py-1 tablet:px-3 tablet:py-1 border rounded-xl text-xs tablet:text-sm ${selectedTags?.includes(tag)
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-700 border-gray-300"
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
                                </div>
                                {errors.tags && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.tags.message}
                                    </p>
                                )}
                            </div>

                            {/* Rate and Status */}
                            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
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
                                        className="mt-1 p-2 w-full bg-transparent outline-none text-base rounded-md bg-white border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.hourlyRate && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.hourlyRate.message}
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

                        {/* Buttons */}
                        <div className="flex flex-col tablet:flex-row gap-4 mt-8 tablet:justify-end">
                            <Button
                                variant="outline"
                                className="w-full tablet:w-auto justify-center border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => setModalStatus(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="filled"
                                type="submit"
                                className="w-full tablet:w-auto justify-center bg-primary hover:bg-primary-dark text-white"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditJobModal;
