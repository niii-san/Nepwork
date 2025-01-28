import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Loader } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api";

function Profile() {
    //function to fetch and set current user profile data

    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);
    const [currentProfileData, setCurrentProfileData] = useState(null);
    console.log(currentProfileData);

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

    if (isLoggedIn && !currentUserData) return <Loader />;

    return (
        <div className="bg-secondary min-h-[800px]">
            Viewing profile of {userId}
            <br />
            isOwnProfile : {userId === currentUserData._id ? "Yes" : "No"}
        </div>
    );
}

export default Profile;
