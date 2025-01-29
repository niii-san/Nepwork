import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Button, ChangeAvatarModal, Loader } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api";
import default_avatar from "../assets/default_avatar.svg";
import Tag from "../components/Tag";

function Profile() {
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);
    const [currentProfileData, setCurrentProfileData] = useState(null);
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

    const isOwnProfile = userId === currentUserData._id;

    return (
        <>
            {changeAvatarModal && (
                <ChangeAvatarModal setModal={setChangeAvatarModal} refetchProfile={fetchSetCurrentProfileData} />
            )}
            <div className="bg-secondary min-h-[800px]">
                <div>
                    <img
                        src={currentProfileData.avatar ?? default_avatar}
                        alt={`Profile Photo of ${currentProfileData.name.firstName}`}
                        className="w-20 h-20"
                    />
                    {isOwnProfile && (
                        <Button onClick={() => setChangeAvatarModal(true)}>
                            Change profile
                        </Button>
                    )}
                </div>
                <div>isOwnProfile : {isOwnProfile ? "Yes" : "No"}</div>
                <div>
                    Name: {currentProfileData.name.firstName}{" "}
                    {currentProfileData.name.lastName}
                </div>
                <div>
                    {currentProfileData.kyc.address.temporary.city.toUpperCase()}
                    ,{currentProfileData.kyc.address.temporary.state}
                </div>
                <div>About: {currentProfileData.about ?? ""}</div>
                <div>Joined: {getJoinedTime(currentProfileData.createdAt)}</div>
                <div>
                    Verified: {currentProfileData.kycVerified ? "yes" : "no"}
                </div>
                <div>
                    Tags:
                    {currentProfileData?.tags?.map((item) => (
                        <Tag key={item} title={item} />
                    ))}
                </div>
                <div>
                    Available: {currentProfileData.available ? "yes" : "no"}
                </div>
                <div>Hourly Rate: {currentProfileData.hourlyRate}</div>
                <div>Rating: {currentProfileData.rating}</div>
            </div>
        </>
    );
}

export default Profile;
