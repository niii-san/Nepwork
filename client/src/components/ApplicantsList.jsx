import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import Button from "./Button";
import default_avatar from "../assets/default_avatar.svg";
import { FiMessageSquare, FiUserCheck, FiExternalLink } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";

function ApplicantsList({ currentJobData, userData }) {
    const [applicants, setApplicants] = useState([]);

    const fetchSetApplicants = async () => {
        try {
            const response = await api.get(
                `/jobs/applicants/${currentJobData._id}`,
            );
            setApplicants(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch applicants");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSetApplicants();
    }, []);

    return (
        <div className="w-full md:w-96 lg:w-[420px]">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Applicants
                        <span className="ml-2 text-primary bg-blue-50 px-3 py-1 rounded-full text-sm">
                            {applicants.length}
                        </span>
                    </h2>
                </div>

                <div className="space-y-3">
                    {applicants.length === 0 ? (
                        <div className="text-center p-6 rounded-lg bg-gray-50">
                            <p className="text-gray-500">No applicants yet</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Your job applicants will appear here once
                                applicants apply
                            </p>
                        </div>
                    ) : (
                        applicants.map((item) => (
                            <ApplicantListCard
                                key={item.appliedBy._id}
                                applicantData={item}
                                isOwner={
                                    currentJobData.postedBy._id ===
                                    userData?._id
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    function ApplicantListCard({ applicantData, isOwner }) {
        const getTimeSinceApplied = (createdAt) => {
            const now = new Date();
            const createdTime = new Date(createdAt);
            const timeDifference = Math.floor((now - createdTime) / 1000);

            if (timeDifference < 60) return `${timeDifference} seconds ago`;
            if (timeDifference < 3600) {
                const minutes = Math.floor(timeDifference / 60);
                return `Applied ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            }
            if (timeDifference < 86400) {
                const hours = Math.floor(timeDifference / 3600);
                return `Applied ${hours} hour${hours > 1 ? "s" : ""} ago`;
            }
            const days = Math.floor(timeDifference / 86400);
            return `Applied ${days} day${days > 1 ? "s" : ""} ago`;
        };

        return (
            <div className="group p-4 rounded-lg transition-all duration-200 bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Image + Time Container */}
                    <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
                        <img
                            src={
                                applicantData.appliedBy.avatar || default_avatar
                            }
                            alt={`${applicantData.appliedBy.name.firstName}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="flex items-center gap-1 text-xs text-gray-500 sm:hidden">
                            <HiOutlineClock className="w-3 h-3" />
                            <span>
                                {getTimeSinceApplied(applicantData.createdAt)}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full min-w-0">
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                                {applicantData.appliedBy.name.firstName}{" "}
                                {applicantData.appliedBy.name.lastName}
                            </h3>
                            {/* Desktop-only time display */}
                            <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
                                <HiOutlineClock className="w-4 h-4" />
                                <span>
                                    {getTimeSinceApplied(
                                        applicantData.createdAt,
                                    )}
                                </span>
                            </div>
                        </div>

                        {applicantData.message && (
                            <div className="mt-2 pl-2 border-l-2 border-primary">
                                <p className="text-sm text-gray-600 italic line-clamp-2">
                                    "{applicantData.message}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Action Buttons */}
                {isOwner && (
                    <div className="flex gap-2 w-full mt-2">
                        <Button
                            variant="outline"
                            className="text-sm w-full justify-evenly"
                            onClick={() => handleViewMessage(applicantData._id)}
                        >
                            <FiMessageSquare className="w-4 h-4" />
                            <span className="hidden md:inline-block">
                                View Msg
                            </span>
                        </Button>
                        <Button
                            variant="filled"
                            className="text-sm w-full justify-evenly"
                            onClick={() =>
                                handleAccept(applicantData.appliedBy._id)
                            }
                        >
                            <FiUserCheck className="w-4 h-4" />
                            <span className="hidden md:inline-block">
                                Accept
                            </span>
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

export default ApplicantsList;
