import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../utils/api";
import { Button, EditJobModal, Loader } from "../components";
import default_avatar from "../assets/default_avatar.svg";
import { useUser } from "../stores";
import Tag from "../components/Tag";

function Jobs() {
    const { jobId } = useParams();
    const userData = useUser((state) => state.data);
    console.log(userData);
    const [currentJob, setCurrentJob] = useState(null);
    const [showEditJobModal, setShowEditJobModal] = useState(false);

    const statusStyles = {
        open: "bg-primary text-whitetext",
        closed: "bg-red-500 text-whitetext",
        finished: "bg-gray-500 text-whitetext",
        in_progress: "bg-gray-500 text-whitetext",
    };

    useEffect(() => {
        const fetchSetCurrentJob = async () => {
            try {
                const response = await api.get(`/jobs/${jobId}`);
                setCurrentJob(response.data.data);
            } catch (error) {
                console.error(`failed to fetch job`, error);
            }
        };
        fetchSetCurrentJob();
    }, []);
    const getTimeSincePosted = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);
        const timeDifference = Math.floor((now - createdTime) / 1000);

        if (timeDifference < 60) {
            return `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }
    };
    return (
        <>
            {showEditJobModal && (
                <EditJobModal
                    jobData={currentJob}
                    setModalStatus={setShowEditJobModal}
                />
            )}

            <div className="min-h-[800px] max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    {!currentJob ? (
                        <Loader />
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {/* Job Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <Link
                                    to={`/profile/${currentJob.postedBy._id}`}
                                >
                                    <img
                                        src={
                                            currentJob.postedBy.avatar ??
                                            default_avatar
                                        }
                                        alt="Avatar"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </Link>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {currentJob.title}
                                    </h1>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[currentJob.status] || "bg-gray-100"}`}
                                        >
                                            {currentJob.status === "in_progress"
                                                ? "In Progress"
                                                : currentJob.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                currentJob.status.slice(1)}
                                        </span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-600">
                                            {getTimeSincePosted(
                                                currentJob.createdAt,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <div>
                                            Posted by
                                            <Link
                                                to={`/profile/${currentJob.postedBy._id}`}
                                            >
                                                <span className="ml-1 hover:text-black">
                                                    {
                                                        currentJob.postedBy.name
                                                            .firstName
                                                    }{" "}
                                                    {
                                                        currentJob.postedBy.name
                                                            .lastName
                                                    }
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Hourly Rate
                                    </h3>
                                    <p className="text-lg text-gray-900">
                                        NRS {currentJob.hourlyRate}/hr
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Applicants
                                    </h3>
                                    <p className="text-lg text-gray-900">
                                        {currentJob.appliedBy.length}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Accepted Freelancer
                                    </h3>
                                    <p className="text-lg text-gray-900">
                                        {currentJob.acceptedFreelancer ??
                                            "Not selected"}
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Skills Required
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {currentJob.tags.map((item) => (
                                        <Tag
                                            title={item}
                                            key={item}
                                            className="bg-blue-100 text-blue-800"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                    Job Description
                                </h2>
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {currentJob.description}
                                </p>
                            </div>

                            {/* Action Button */}
                            {userData &&
                                currentJob.postedBy._id === userData._id ? (
                                <Button
                                    variant="filled"
                                    className="w-full py-3 font-semibold bg-blue-600 border-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => setShowEditJobModal(true)}
                                >
                                    Edit Job Post
                                </Button>
                            ) : (
                                <Button variant="filled" className="w-full py-3 font-semibold">
                                    Apply Now
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/*Applicants List */}
                {currentJob && (
                    <div className="w-full md:w-96">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Applicants ({currentJob.appliedBy.length})
                            </h2>
                            <div className="space-y-4">
                                {currentJob.appliedBy.length > 0 ? (
                                    currentJob.appliedBy.map((applicant) => (
                                        <div
                                            key={applicant._id}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <img
                                                src={
                                                    applicant.avatar ??
                                                    default_avatar
                                                }
                                                alt="Applicant"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {applicant.name.firstName}{" "}
                                                    {applicant.name.lastName}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {applicant.title}
                                                </p>
                                            </div>
                                            {currentJob.postedBy._id ===
                                                userData?._id && (
                                                    <Button className="text-sm px-3 py-1">
                                                        View Profile
                                                    </Button>
                                                )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-4">
                                        No applicants yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Jobs;

/*
 {
        "_id": "67924dd7074e0e5b64154f6a",
        "title": "test",###
        "description": "testasdfadsf adf",###
        "postedBy": {###
            "name": {
                "firstName": "Nishan",
                "middleName": "",
                "lastName": "Bista"
            },
            avatar:"profile_picture_url" or null.###
            "_id": "67756cc5b2a720d137dee1c6"
        },
        "appliedBy": [],###
        "acceptedFreelancer": null,###
        "hourlyRate": 50,###
        "tags": [###
            "javascript",
            "django"
        ],
        "status": "open",###
        "createdAt": "2025-01-23T14:10:31.521Z",
        "updatedAt": "2025-01-23T14:10:31.521Z",
        "__v": 0
    }
 * */
