import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Button, ChangeAvatarModal, Loader, Review } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api";
import default_avatar from "../assets/default_avatar.svg";
import Tag from "../components/Tag";
import {
    FiEdit,
    FiMessageCircle,
    FiMapPin,
    FiClock,
    FiDollarSign,
    FiCheckCircle,
    FiUserPlus,
    FiStar,
    FiUsers,
} from "react-icons/fi";

const clientJobs = [
    {
        id: 1,
        title: "Website Development",
        description: "Need a responsive website for my bakery business",
        hourlyRate: "$1500",
        date: "2024-03-15",
    },
    {
        id: 2,
        title: "Mobile App Design",
        description: "UI/UX design for a fitness tracking application",
        hourlyRate: "$2500",
        date: "2024-03-20",
    },
];

function Profile() {
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);
    const [currentProfileData, setCurrentProfileData] = useState(null);
    const [changeAvatarModal, setChangeAvatarModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userRating, setUserRating] = useState(3);
    const [editHourlyRate, setEditHourlyRate] = useState(false);
    const [hourlyRateInput, setHourlyRateInput] = useState("");

    const fetchSetCurrentProfileData = async () => {
        try {
            const response = await api.get(`/user/profiles/${userId}`);
            setCurrentProfileData(response.data.data);
            setHourlyRateInput(response.data.data.hourlyRate || "");
        } catch (error) {
            toast.error("Failed to load profile");
            console.error(error);
        }
    };
    const getJoinedTime = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);
        const timeDifference = Math.floor((now - createdTime) / 1000);

        if (timeDifference < 60) return `${timeDifference} seconds ago`;
        if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        }
        if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }
        const days = Math.floor(timeDifference / 86400);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    };

    const handleHourlyRateUpdate = async () => {
        try {
            await api.patch(`/user/profiles/${userId}`, {
                hourlyRate: hourlyRateInput,
            });
            setEditHourlyRate(false);
            toast.success("Hourly rate updated!");
            fetchSetCurrentProfileData();
        } catch (error) {
            toast.error("Failed to update hourly rate");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSetCurrentProfileData();
    }, [userId]);

    if ((isLoggedIn && !currentUserData) || !currentProfileData)
        return <Loader />;

    const isOwnProfile = userId === currentUserData?._id;
    const isFreelancer = currentProfileData.role === "freelancer";
    const isClient = currentProfileData.role === "client";

    return (
        <>
            {changeAvatarModal && (
                <ChangeAvatarModal
                    setModal={setChangeAvatarModal}
                    refetchProfile={fetchSetCurrentProfileData}
                />
            )}

            <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
                {/* Profile Header Section */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    {/* Left Column - Avatar & Actions */}
                    <div className="w-full md:w-64 flex flex-col items-center space-y-4">
                        <div className="relative group">
                            <img
                                src={
                                    currentProfileData.avatar ?? default_avatar
                                }
                                alt={`Profile Photo of ${currentProfileData.name.firstName}`}
                                className="w-48 h-48 rounded-full shadow-lg object-cover border-4 border-white hover:border-gray-100 transition-all"
                            />
                            {isOwnProfile && (
                                <button
                                    onClick={() => setChangeAvatarModal(true)}
                                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <FiEdit className="w-5 h-5 text-gray-700" />
                                </button>
                            )}
                        </div>

                        {/* Social Stats */}
                        <div className="flex justify-center gap-6 w-full">
                            <div className="text-center">
                                <div className="font-semibold text-gray-900">
                                    22
                                </div>
                                <div className="text-sm text-gray-500">
                                    Following
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-gray-900">
                                    22
                                </div>
                                <div className="text-sm text-gray-500">
                                    Followers
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {!isOwnProfile && (
                            <div className="w-full flex justify-evenly ">
                                <Button
                                    variant={isFollowing ? "outline" : "filled"}
                                    className=" text-sm flex items-center justify-center gap-2"
                                    onClick={() => setIsFollowing(!isFollowing)}
                                >
                                    <FiUserPlus className="w-4 h-4" />
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </Button>
                                <Button
                                    variant="filled"
                                    className="text-sm flex w-fit rounded-full bg-blue-600 border-blue-600 items-center justify-center gap-2"
                                >
                                    <FiMessageCircle className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Profile Details */}
                    <div className="flex-1 space-y-6">
                        {/* Name & Basic Info */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {currentProfileData.name.firstName}{" "}
                                    {currentProfileData.name.lastName}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <FiStar className="w-5 h-5 text-yellow-500" />
                                    <span className="font-medium text-gray-700">
                                        {currentProfileData.rating}/5
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FiMapPin className="w-5 h-5" />
                                <span>
                                    {
                                        currentProfileData.kyc.address.temporary
                                            .city
                                    }
                                    ,
                                    {
                                        currentProfileData.kyc.address.temporary
                                            .state
                                    }
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FiClock className="w-5 h-5" />
                                <span>
                                    Joined{" "}
                                    {getJoinedTime(
                                        currentProfileData.createdAt,
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Verification Status */}
                        {currentProfileData.kycVerified && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full w-fit">
                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-green-700">
                                    Verified Profile
                                </span>
                            </div>
                        )}

                        {/* Freelancer Specific Info */}
                        {isFreelancer && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                        <FiDollarSign className="w-5 h-5 text-blue-600" />
                                        {editHourlyRate ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={hourlyRateInput}
                                                    onChange={(e) =>
                                                        setHourlyRateInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-24 px-2 py-1 rounded border border-blue-200 bg-white text-sm"
                                                />
                                                <button
                                                    onClick={
                                                        handleHourlyRateUpdate
                                                    }
                                                    className="text-blue-600 hover:text-blue-700 text-sm"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setEditHourlyRate(false)
                                                    }
                                                    className="text-gray-500 hover:text-gray-700 text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="font-medium text-blue-700">
                                                    $
                                                    {
                                                        currentProfileData.hourlyRate
                                                    }
                                                    /hr
                                                </span>
                                                {isOwnProfile && (
                                                    <button
                                                        onClick={() =>
                                                            setEditHourlyRate(
                                                                true,
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        <FiEdit className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                                            currentProfileData.available
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-700"
                                        }`}
                                    >
                                        <span className="text-sm font-medium">
                                            {currentProfileData.available
                                                ? "Available Now"
                                                : "Not Available"}
                                        </span>
                                    </div>
                                </div>

                                {!isOwnProfile && (
                                    <Button
                                        variant="filled"
                                        className="rounded-full px-6 py-2.5 text-sm font-medium"
                                    >
                                        Hire Now
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Tags Section */}
                        {isFreelancer && (
                            <div className="pt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Skills
                                    </h2>
                                    {isOwnProfile && (
                                        <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                                            <FiEdit className="mr-1 w-4 h-4" />
                                            Edit
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {currentProfileData.tags.map((item) => (
                                        <Tag
                                            key={item}
                                            title={item}
                                            variant="primary"
                                            size="sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* About Section */}
                <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            About
                        </h2>
                        {isOwnProfile && (
                            <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                                <FiEdit className="mr-1 w-4 h-4" />
                                Edit
                            </button>
                        )}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {currentProfileData.about || "No description provided"}
                    </p>
                </section>

                {/* Client Jobs Section */}
                {isClient && (
                    <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Posted Jobs
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {clientJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="border rounded-xl p-5 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {job.title}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {job.date}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {job.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-blue-600 text-sm">
                                            {job.hourlyRate}
                                        </span>
                                        <Button
                                            variant="outlined"
                                            className="px-3 py-1.5 text-sm"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <section className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Reviews
                        </h2>
                        {!isOwnProfile && (
                            <Button
                                variant="filled"
                                className="rounded-full px-5 py-2 text-sm"
                            >
                                Share Your Experience
                            </Button>
                        )}
                    </div>
                    <div className="space-y-5">
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </section>
            </div>
        </>
    );
}
export default Profile;
