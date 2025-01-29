import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Button, ChangeAvatarModal, Loader, Review } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api";
import default_avatar from "../assets/default_avatar.svg";
import { IoLocationOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { BiMessageRoundedDots } from "react-icons/bi";
import Tag from "../components/Tag";

function Profile() {
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);
    const [currentProfileData, setCurrentProfileData] = useState(null);
    console.log(currentProfileData);

    const [changeAvatarModal, setChangeAvatarModal] = useState(false);

    //function to fetch and set current user profile data
    const fetchSetCurrentProfileData = async () => {
        try {
            const response = await api.get(`/user/profiles/${userId}`);
            setCurrentProfileData(response.data.data);
        } catch (error) {
            toast.error("Failed to load profile");
            console.error(error);
        }
    };
    useEffect(() => {
        fetchSetCurrentProfileData();
    }, [userId]);

    const getJoinedTime = (createdAt) => {
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

    if ((isLoggedIn && !currentUserData) || !currentProfileData)
        return <Loader />;

    const isOwnProfile = userId === currentUserData?._id;

    return (
        <>
            {changeAvatarModal && (
                <ChangeAvatarModal
                    setModal={setChangeAvatarModal}
                    refetchProfile={fetchSetCurrentProfileData}
                />
            )}
            <div className="flex mb-4 flex-col justify-center items-center">
                <div className="mt-8 flex w-[1100px]">
                    <div className="flex gap-2 items-center flex-col">
                        <img
                            src={currentProfileData.avatar ?? default_avatar}
                            alt={`Profile Photo of ${currentProfileData.name.firstName}`}
                            className="w-[280px] h-[280px] rounded-[35px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]"
                        />
                        <div className="flex justify-evenly text-lg font-medium w-full">
                            <span>22 followers</span>
                            <span>22 following</span>
                        </div>

                        <div
                            className={
                                isOwnProfile
                                    ? "w-full"
                                    : "w-[90%] flex justify-between"
                            }
                        >
                            {isOwnProfile ? (
                                <Button
                                    className={"w-full"}
                                    onClick={() => setChangeAvatarModal(true)}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button>Follow</Button>
                                    <button className="bg-[#1C98F7] text-xl text-whitetext rounded-[10px] px-4">
                                        <BiMessageRoundedDots />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {/* <div>isOwnProfile : {isOwnProfile ? "Yes" : "No"}</div> */}
                    <div className="flex ml-[26px] mt-10 w-[80%] flex-col">
                        <div className="text-[#292d32] flex justify-between items-center  font-semibold text-[40px]">
                            <div>
                                {currentProfileData.name.firstName}{" "}
                                {currentProfileData.name.lastName}
                                <span className="border border-[#868686] px-2 ml-2 py-[2px] rounded-[15px] text-[#868686] text-[10px] font-medium">
                                    Joined{" "}
                                    {getJoinedTime(
                                        currentProfileData.createdAt,
                                    )}
                                </span>
                            </div>
                            <div className="flex flex-col items-center mr-2">
                                <div className="flex items-center">
                                    <CiStar className="text-primary" />{" "}
                                    {currentProfileData.rating}
                                </div>
                                {!isOwnProfile && (
                                    <span className="font-semibold text-xl text-[#5c5f65] mt-1">
                                        Your Rating: 3
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-[#868686] flex items-center text-sm font-medium">
                            <IoLocationOutline />
                            <span>
                                {/* {currentProfileData.kyc.address.temporary.city.toUpperCase()}
                                ,
                                {currentProfileData.kyc.address.temporary.state} */}
                                Kathmandu, Nepal
                            </span>
                        </div>
                        <div className="text-base font-medium mt-2">
                            Available to work:{" "}
                            {currentProfileData.available ? "Yes" : "No"}
                        </div>
                        <div className="bg-[#E4E4E4] text-xl font-medium rounded-sm w-[250px] h-[50px] flex px-2 items-center mt-2 group relative justify-between">
                            <span>Rs.{currentProfileData.hourlyRate} / Hr</span>
                            {isOwnProfile && (
                                <span className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer flex items-center gap-1 border border-[#868686] rounded-lg px-2 py-[1px]">
                                    <u>Edit Price</u>
                                </span>
                            )}
                        </div>
                        <div>
                            {/* {currentProfileData.kyc.address.temporary.city.toUpperCase()}
                            ,{currentProfileData.kyc.address.temporary.state} */}
                        </div>
                        <div>
                            {/* Verified:{" "}
                            {currentProfileData.kycVerified ? "yes" : "no"} */}
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                            <Tag title="Design" />
                            <Tag title="Frontend" />
                            <Tag title="Figma" />
                            <Tag title="Graphic" />
                            <Tag title="Canva" />
                            <Tag title="Design" />
                            <Tag title="Frontend" />
                            <Tag title="Figma" />
                            {currentProfileData?.tags?.map((item) => (
                                <Tag key={item} title={item} />
                            ))}
                            {isOwnProfile && (
                                <span className="text-xs text-primary hover:text-gray-700 cursor-pointer flex items-center gap-1 border border-primary rounded-lg px-2 py-[1px]">
                                    <u>Update Tags</u>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-[1100px] mt-4 relative group">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[#292d32] text-[26px] font-medium flex items-center gap-2">
                            About
                            {isOwnProfile && (
                                <span className="mt-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer flex items-center gap-1 border border-[#868686] rounded-lg px-2 py-[1px]">
                                    <u>Update About</u>
                                </span>
                            )}
                        </h3>
                    </div>
                    <p className="text-[#787878] text-base font-medium mt-1">
                        {currentProfileData.about ?? "No description added yet"}
                    </p>
                </div>
                <span className="text-3xl font-semibold mt-6">Reviews</span>
                <div className="mt-6 flex flex-wrap gap-6 mb-8">
                    {[...Array(3)].map((_, index) => (
                        <Review key={index} />
                    ))}
                </div>

                <div className="text-right w-[1100px]">
                    {!isOwnProfile && (
                        <Button
                            className="bg-green-100 w-full"
                            onClick={() => console.log("Write review clicked")}
                        >
                            Write Your Review....
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
