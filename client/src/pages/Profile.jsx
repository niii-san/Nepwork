import React, { useEffect } from "react";
import { data, useParams } from "react-router";
import { useAuth, useUser } from "../stores";
import { Loader } from "../components";
import { useState } from "react";
import api from "../utils/api";

function Profile() {
    const [currentPorfileData,setCurrentProfileData] = useState(null)
    const { userId } = useParams();
    const isLoggedIn = useAuth((state) => state.isLoggedIn);
    const currentUserData = useUser((state) => state.data);


    useEffect(()=>{
        const fetchSetProfileData = async ()=>{
            const response = await api.get("/user/get-profile-data")
        }
        fetchSetProfileData()
    },[])
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
